import Modal from "@/shared/UI/Modal";
import { EnumModals } from "@/shared/UI/Modal/EnumModals";
import Image from "next/image";

import defaultImg from "../../images/default.svg";

export const SettingsAuthModal = () => {
  return (
    <Modal name={EnumModals.SETTINGS} title="Настройки аккаунта">
      <div>
        <Image src={defaultImg} alt="avatar" />
        <div>
          <p>JPG, PNG, 64 х 64 px не более 4.00 MB</p>
          <button className="link">Загрузить изображение</button>
        </div>
      </div>
      <div>
        <div>
          <p>Email</p>
          <button className="link">Изменить почту</button>
        </div>
        <input defaultValue={"EnakenSkayouker@gmail.com"} />
      </div>
    </Modal>
  );
};
