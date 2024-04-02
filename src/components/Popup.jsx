import Image from "next/image";

export default function Popup() {
  return (
    <div className="p-4">
      <div>
        <Image src="sign-icon.svg" width={24} height={24} alt="Upgrade-icon" />
        <div>
          <p>GPT-3.5</p>
          <p>Great for everyday tasks</p>
        </div>
        <div></div>
      </div>
      <div>
        <Image src="sign-icon.svg" width={24} height={24} alt="Upgrade-icon"/>
        <div>
            <p>GPT-4</p>
            <p>Our smartest and most capable model.</p>
            <p>Includes DALL.E, browsing and more.</p>
        </div>
      </div>
      <div >
        <button>Upgrade to Plus</button>
      </div>
    </div>
  );
}
