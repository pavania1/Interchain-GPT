'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Tooltip } from '@mui/material';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {
  addSession,
  addSessionData,
  disconnectWallet,
} from '@/redux/actions/sessionActions';
import { v4 as uuidv4 } from 'uuid';
import Popup from './Popup';
import { getWalletAmino, isWalletInstalled } from '@/app/utils/wallet';
import { networkInfo } from '@/app/utils/config';
import { setWallet } from '@/redux/actions/sessionActions';
import { disconnect } from 'process';

export default function MainPage(props) {
  const sessionData = useSelector(state => state.session.sessionData);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [message, setMessage] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const walletState = useSelector(state => state.session.wallet);

  const handleShareClick = () => {
    setIsPopupOpen(true);
  };
  useEffect(() => {
    let sessionId = sessionStorage.getItem('sessionId');
    if (!sessionId) {
      sessionId = uuidv4();
      sessionStorage.setItem('sessionId', sessionId);
      dispatch(
        addSession({
          sessionId,
          createdAt: Date.now(),
        })
      );
    }
  }, []);

  useEffect(() => {
    let p = props.sessionId || '';
    const oldMessages = sessionData[p];
    if (oldMessages) {
      setData([...oldMessages]);
    }
    if (p.length == 0) {
      setData([]);
    }
  }, [props.sessionId]);

  useEffect(() => {
    connectWallet();
  }, []);

  const connectWallet = async () => {
    if (!isWalletInstalled()) {
      alert('Wallet is not installed');
    } else {
      window.wallet.defaultOptions = {
        sign: {
          preferNoSetMemo: true,
          disableBalanceCheck: true,
        },
      };
      try {
        await window.wallet.experimentalSuggestChain(networkInfo);
        await getWalletAmino(networkInfo.chainId || '');
        const walletInfo = await window.wallet.getKey(networkInfo.chainId);
        walletInfo.pubKey = Buffer.from(walletInfo?.pubKey).toString('base64');
        dispatch(
          setWallet({
            name: walletInfo.name,
            connected: true,
            isNanoLedger: false,
            pubKey: walletInfo.pubKey,
            address: walletInfo.bech32Address,
          })
        );
      } catch (error) {
        alert(error);
      }
    }
  };

  const handleMessageChange = event => {
    setMessage(event.target.value);
  };

  const handleSubmit = () => {
    console.log('Submitted message:', message);
    let copyData = [
      {
        message,
        type: 'You',
      },
    ];
    dispatch(addSessionData(copyData[0]));
    setData(prev => [...prev, ...copyData]);
    setMessage('');
    axios
      .post('https://api.resolute.vitwit.com/gpt/predict', {
        input_str: message,
      })
      .then(response => {
        console.log(response);
        if (response.data.result.length == 0) {
          console.log('Entered pending case');
          let copyData = [
            {
              message: 'Your request is inserted into a queue.',
              type: 'InterChainGPT',
            },
          ];
          dispatch(addSessionData(copyData[0]));

          setData(prev => [...prev, ...copyData]);
        } else {
          console.log('Entered Success case');

          let copyData = [
            {
              message: response.data.result,
              type: 'InterChainGPT',
            },
          ];
          dispatch(addSessionData(copyData[0]));
          setData(prev => [...prev, ...copyData]);
        }
      })

      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="bg-[#171717] flex flex-col  w-full p-4 overflow-y-hidden h-[100vh] ">
      <div className="flex space-x-1 items-start w-full xs:hidden sm:hidden lg:flex md:flex justify-between">
        <div className="space-x-2 flex hover:bg-zinc-800 p-2 rounded-xl">
          <div className="font-medium text-white text-lg">InterChainGPT</div>
          <p className="text-[rgb(224,215,215)] font-medium text-lg">3.5</p>
        </div>
        <div className="font-medium text-white justify-end w-96 flex">
          <a
            onClick={() => {
              if (walletState?.connected) {
                dispatch(disconnectWallet());
              } else {
                connectWallet();
              }
            }}
            className="hover:cursor-pointer border border-white/80 dual-stick-effect hover:border-white/90 text-white hover:text-white rounded-md mr-5 px-3 py-1.5 text-md font-medium hidden md:flex  items-center justify-end custom-font-inter"
          >
            {walletState?.connected ? 'Disconnect' : 'Connect wallet'}
          </a>
        </div>
        {/* <div
          className="hover:bg-zinc-800 p-2 rounded-xl"
          onClick={handleShareClick}
        >
          <Image src="/share.png" width={24} height={24} alt="Share-Icon" />
        </div>
        {isPopupOpen && (
          <Popup
            data={data}
            open
            close={() => {
              setIsPopupOpen(false);
            }}
          />
        )} */}
      </div>
      <div className="flex items-center justify-center w-full h-full">
        <div className="max-w-[1100px] justify-center h-[100%] min-w-[40vw] ">
          <div
            className={`flex flex-col my-6 items-center overflow-y-scroll h-[80%] ${
              data.length > 0 ? '' : 'justify-center'
            }`}
          >
            {data.length > 0 ? (
              <div className="">
                {data.map((item, index) => {
                  return (
                    <div className="my-6 text-white" key={index}>
                      <span style={{ fontWeight: 'bold', fontSize: '18px' }}>
                        {item.type}:
                      </span>
                      <br />
                      {item.message}
                    </div>
                  );
                })}
              </div>
            ) : (
              <>
                <div className="">
                  <Image
                    src="/logo.svg"
                    width={50}
                    height={50}
                    alt="logo-icon"
                  />
                </div>
                <div className="font-medium text-2xl mt-2 text-white">
                  How can I help you today?
                </div>
              </>
            )}
          </div>

          <div className="border rounded-xl border-zinc-600 p-2 flex w-full">
            <textarea
              type="text"
              value={message}
              onChange={handleMessageChange}
              placeholder="Message InterChainGPT..."
              className="w-full bg-transparent outline-none border-none text-[rgb(173,171,171)]"
            />

            <button
              className="border rounded-xl border-zinc-600 p-2 bg-white"
              onClick={handleSubmit}
            >
              <Image src="/arrow.png" width={24} height={24} alt="enter-icon" />
            </button>
          </div>
          <div className="mt-2 text-xs text-[rgb(173,171,171)] text-center">
            InterChainGPT can make mistakes. Consider checking important
            information.
          </div>
        </div>
      </div>
    </div>
  );
}
