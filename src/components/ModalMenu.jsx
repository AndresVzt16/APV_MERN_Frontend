import React from "react";

const ModalMenu = () => {
  return (
    <nav
      className={`z-50 min-w-72    box-border transition-all ${desplegar} rounded-lg shadow-lg absolute bottom-0 top-full mt-2 bg-white `}
    >
      <Link
        className={`text-gray-500  ${
          textShow ? " scale-100" : " scale-0 "
        } transition-all  mt-2 flex gap-2 items-center`}
      >
        <UserIcon className="p-1 size-7 text-cyan-500 " /> Perfil
      </Link>
      <Link
        className={`${
          textShow ? " scale-100" : " scale-0 "
        } transition-all  text-gray-500 mt-2 flex gap-2 items-center`}
      >
        <DocumentIcon className="p-1 size-7 text-cyan-500 " /> Citas
      </Link>
      <Link
        className={`${
          textShow ? " scale-100" : " scale-0 "
        } transition-all text-gray-500 mt-2 flex gap-2 items-center`}
      >
        <ArrowLeftEndOnRectangleIcon className="p-1 size-7 text-cyan-500 " />{" "}
        Cerrar Sesión
      </Link>
    </nav>
  );
};

export default ModalMenu;
