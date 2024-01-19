import { FC, useState } from "react";
import Button from "@/shared/UI/Button";
import Modal from "@/shared/UI/Modal";
import { Login } from "./Login";
import { Wrapper } from "../ui/Wrapper";
import styles from "../styles/auth.module.scss";
import { Registration } from "./Registration";
import IconX from "@/shared/icons/IconX";

export const ButtonLogin: FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [login, setLogin] = useState<boolean>(true);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const openRegister = () => setLogin(false);
  const openLogin = () => setLogin(true);
  return (
    <>
      <Button width="173px" type="gradient" onClick={onOpenModal}>
        Войти
      </Button>
      <Modal
        open={open}
        setOpen={setOpen}
        stylesWrapper={{ flex: "0 1 588px" }}
      >
        <Wrapper>
          <button
            className={`modal-close ${styles.close}`}
            onClick={onCloseModal}
          >
            <IconX />
          </button>
          {login ? <Login /> : <Registration />}
          <button
            onClick={login ? openRegister : openLogin}
            className={styles.btn}
          >
            {login ? "Зарегестрироваться" : "Войти"}
          </button>
        </Wrapper>
      </Modal>
    </>
  );
};
