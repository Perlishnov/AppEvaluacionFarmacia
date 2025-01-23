import React, { useState, useEffect } from "react";
import AdministradorLayout from "../../layouts/AdministradorLayout";

/**
 * Importaciones de NextUI v2:
 * - Table, TableHeader, TableBody, TableColumn, TableRow, TableCell
 * - Modal, ModalContent, ModalHeader, ModalBody
 * - Button, Input, etc.
 */
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  DropdownSection
} from "@nextui-org/react";

import { Eye, Pencil, Trash } from "lucide-react";

/** Interfaz para cada usuario */
interface Usuario {
  id: string;               // ID único del usuario (puede ser un string o number según la DB)
  nombre: string;           // Primer nombre
  apellido: string;         // Apellido(s)
  email: string;            // Correo electrónico del usuario
  documento: string;        // Documento de identificación
  tipoDocumento: string;    // Tipo de documento (ejemplo: Cédula, Pasaporte, etc.)
  rol: string;              // Rol del usuario (ejemplo: Administrador, Inspector, etc.)
  password?: string;        // Contraseña (opcional, ya que puede generarse automáticamente)
}

 // Ejemplo de función para mapear `personTypeId` a roles
  const obtenerRol = (personTypeId: number): string => {
    switch (personTypeId) {
      case 2:
        return "Inspector";
      case 3:
        return "Propietario";
      case 1:
        return "Administrador";
      default:
        return "Desconocido";
    }
  };
  const obtenerPersonTypeId = (rol: string): number => {
  switch (rol) {
    case "Inspector":
      return 1;
    case "Propietario":
      return 2;
    case "Administrador":
      return 3;
    default:
      return 0; // Valor por defecto si el rol no coincide
  }
};
function obtenerDocumentTypeId(tipoDocumento: string): number {
  switch (tipoDocumento.toLowerCase()) {
    case "cédula":
      return 1;
    case "pasaporte":
      return 2;
    default:
      throw new Error(`Tipo de documento no reconocido: ${tipoDocumento}`);
  }
}

export default function UserManagementPage() {
  /**
   * 1. Para evitar problemas de caracteres extraños (tildes):
   *    - Asegúrate de que este archivo esté guardado en UTF-8.
   *    - Si tu entorno soporta "React Strict Mode" con UTF-8, 
   *      debería verse bien "María", "José", etc.
   */

  // Estado para la lista de usuarios (simulada inicialmente)
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch("http://localhost:5041/api/UserAccounts", {
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();

        // Transformar datos obtenidos de la API para que coincidan con el tipo Usuario
        const usuariosTransformados = data.map((user: any) => ({
          id: user.userId.toString(),
          documento: user.documentUser,
          nombre: `${user.nameUser} ${user.lastNameUser}`,
          email: user.emailUser,
          rol: obtenerRol(user.personTypeId), // Ejemplo de mapeo de roles
        }));

        setUsuarios(usuariosTransformados);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };

    fetchUsuarios();
  }, []);


  // Estado para el término de búsqueda
  const [searchTerm, setSearchTerm] = useState("");

  // Manejo de modales (ver detalle, editar, agregar)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Usuario seleccionado (para ver detalle o editar)
  const [selectedUser, setSelectedUser] = useState<Usuario | null>(null);

  // Estado para los campos de edición / agregado
  const [editData, setEditData] = useState<Usuario>({
  id: "",
  nombre: "",
  apellido: "",
  email: "",
  documento: "",
  tipoDocumento: "Cédula", // Valor predeterminado
  rol: "Inspector",
});

  // 2. Búsqueda de usuarios por nombre o ID.
  // COMENTARIO: En un escenario real, la búsqueda
  //            podría llamar a la API en cada cambio de searchTerm.
  //            Aquí filtramos localmente. 
  const filteredUsers = usuarios.filter((user) => {
    // busco coincidencia en nombre o ID
    const lowerSearch = searchTerm.toLowerCase();
    return (
      user.nombre.toLowerCase().includes(lowerSearch) ||
      user.id.toLowerCase().includes(lowerSearch)
    );
  });
   const handleSelectionChange = (keys) => {
    setNewUserData((prev) => ({
      ...prev,
      rol: Array.from(keys).join(", "), // Actualizar el rol con el valor seleccionado
    }));
  };

  // Columnas para la tabla
  const columns = [
    { key: "nombre", label: "Nombre" },
    { key: "email", label: "Correo Electrónico" },
    { key: "rol", label: "Rol" },
    { key: "acciones", label: "Acciones" },
  ];

  /**
   * Función para manejar la apertura del modal de detalle
   */
  const handleOpenDetail = (user: Usuario) => {
    setSelectedUser(user);
    setIsDetailModalOpen(true);
  };

  /**
   * Función para manejar la apertura del modal de edición
   */
  const handleOpenEdit = (user: Usuario) => {
    setSelectedUser(user);
    // Copiamos los datos del usuario al estado editData
    setEditData({ ...user });
    setIsEditModalOpen(true);
  };

  /**
   * Función para manejar "desactivación" (soft delete)
   * de un usuario
   */
  const handleDeleteUser = (user: Usuario) => {
    // COMENTARIO: En la vida real, harías una llamada a tu API, 
    //            pasándole user.id para desactivarlo en DB (soft delete).
    // Por ahora, simulamos poniéndolo inactivo en local:
    const updatedUsers = usuarios.map((u) =>
      u.id === user.id ? { ...u, activo: false } : u
    );
    setUsuarios(updatedUsers);
    alert(`Usuario "${user.nombre}" desactivado (soft delete).`);
  };

  /**
   * 3. Guardar cambios de edición en la tabla
   * (y en la API / base de datos)
   */
    const handleSaveEdit = async () => {
    if (!editData.id) {
      alert("Falta el ID del usuario (error)...");
      return;
    }

    // Prepara el payload para la API con documentUser incluido
    const updatedUser = {
      userId: parseInt(editData.id), // Convertir el ID a entero si es necesario
      documentUser: editData.documento || "1234567890", // Asignar un valor válido
      nameUser: editData.nombre.split(" ")[0] || "", // Primer nombre
      lastNameUser: editData.apellido, // Apellidos
      emailUser: editData.email,
      passwordUser: "hashedpassword", // Placeholder (ajustar según necesidad)
      documentTypeId: 1, // Ajusta según la lógica de tu aplicación
      personTypeId: obtenerPersonTypeId(editData.rol), // Mapear el rol a personTypeId
    };

    try {
      const response = await fetch(
        `http://localhost:5041/api/UserAccounts/${editData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      );

      if (!response.ok) {
        const errorDetails = await response.json(); // Obtener detalles del error
        console.error("Detalles del error:", errorDetails);
        alert(`Error al actualizar: ${errorDetails.message || "Error desconocido"}`);
        return;
      }

      // Actualizar la lista local tras la confirmación del servidor
      const updatedUsers = usuarios.map((u) =>
        u.id === editData.id ? { ...editData } : u
      );
      setUsuarios(updatedUsers);

      setIsEditModalOpen(false);
      alert(`Usuario "${editData.nombre}" actualizado correctamente.`);
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      alert("Hubo un error al actualizar el usuario. Por favor, inténtalo nuevamente.");
    }
  };


  /**
   * 4. Agregar un nuevo usuario
   */
  const [newUserData, setNewUserData] = useState<Usuario>({
    id: "",
    nombre: "",
    apellido: "",
    email: "",
    documento: "",
    tipoDocumento: "",
    rol: "Inspector",
  });

  const handleAddUser = async () => {
    // Validar campos obligatorios
    if (!newUserData.id || !newUserData.nombre || !newUserData.apellido || !newUserData.email || !newUserData.documento || !newUserData.tipoDocumento) {
      alert("Complete todos los campos obligatorios.");
      return;
    }

    // Preparar el payload para la API
    const newUserPayload = {
      documentUser: newUserData.documento,
      nameUser: newUserData.nombre,
      lastNameUser: newUserData.apellido,
      emailUser: newUserData.email,
      passwordUser: "defaultpassword123", // Cambiar según la lógica
      documentTypeId: obtenerDocumentTypeId(newUserData.tipoDocumento), // Mapear tipoDocumento a ID correspondiente
      personTypeId: obtenerPersonTypeId(newUserData.rol), // Mapear rol a personTypeId
    };
    console.log(newUserPayload)

    try {
      const response = await fetch("http://localhost:5041/api/UserAccounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUserPayload),
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        console.error("Error al agregar usuario:", errorDetails);
        alert(`Error al agregar usuario: ${errorDetails.message || "Error desconocido"}`);
        return;
      }

      // Obtener la respuesta del servidor y actualizar la lista local
      const createdUser = await response.json();
      setUsuarios((prevUsuarios) => [...prevUsuarios, createdUser]);

      // Reseteamos los datos del formulario
      setNewUserData({
        id: "",
        nombre: "",
        apellido: "",
        email: "",
        documento: "",
        tipoDocumento: "",
        rol: "Inspector",
      });
      setIsAddModalOpen(false);
      alert(`Usuario "${newUserData.nombre} ${newUserData.apellido}" agregado correctamente.`);
    } catch (error) {
      console.error("Error en la operación:", error);
      alert("Hubo un error al agregar el usuario. Inténtelo nuevamente.");
    }
  };

  /**
   * Renderiza la celda de la tabla
   */
  const renderCell = (user: Usuario, columnKey: string) => {
    switch (columnKey) {
      case "acciones":
        return (
          <div className="flex gap-2">
            {/* Botón del Ojo (ver detalle) */}
            <Button
              isIconOnly
              variant="light"
              aria-label="Ver detalles"
              onPress={() => handleOpenDetail(user)}
            >
              <Eye className="h-4 w-4" />
            </Button>

            {/* Botón del Lápiz (editar) */}
            <Button
              isIconOnly
              variant="light"
              aria-label="Editar usuario"
              onPress={() => handleOpenEdit(user)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </div>
        );
      default:
        return (user as any)[columnKey];
    }
  };

  return (
    <AdministradorLayout>
      <div>
        {/* Título con acentos */}
        <h1 className="text-3xl font-semibold mb-6">
          Gestión de Usuarios
        </h1>

        {/* Buscador y Botón de Agregar Usuario */}
        <div className="flex justify-between items-center mb-4">
          <Input
            placeholder="Buscar usuarios..."
            className="w-1/3"
            value={searchTerm}
            onValueChange={(value) => setSearchTerm(value)}
          />
          <Button className="bg-[#4E5BA6] text-white"  size="lg" onPress={() => setIsAddModalOpen(true)}>
            Agregar Usuario
          </Button>
        </div>

        {/* Tabla */}
        <Table aria-label="Tabla de usuarios" css={{ height: "auto", minWidth: "100%" }}>
          <TableHeader>
            {columns.map((column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            ))}
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                {columns.map((column) => (
                  <TableCell key={`${user.id}-${column.key}`}>
                    {renderCell(user, column.key)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* MODAL DE DETALLE (Eye) */}
      <Modal isOpen={isDetailModalOpen} onClose={() => setIsDetailModalOpen(false)}>
        <ModalContent>
          <ModalHeader>
            <h2>Detalle del Usuario</h2>
          </ModalHeader>
          <ModalBody>
            {selectedUser && (
              <div className="space-y-2">
                <p><strong>ID:</strong> {selectedUser.id}</p>
                <p><strong>Documento:</strong> {selectedUser.documento}</p>
                <p><strong>Nombre:</strong> {selectedUser.nombre}</p>
                <p><strong>Correo:</strong> {selectedUser.email}</p>
                <p><strong>Rol:</strong> {selectedUser.rol}</p>
              </div>
            )}
            <div className="mt-4 flex justify-end">
              <Button variant="bordered" onPress={() => setIsDetailModalOpen(false)}>
                Cerrar
              </Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* MODAL DE EDICIÓN (Pencil) */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <ModalContent>
          <ModalHeader>
            <h2>Editar Usuario</h2>
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <Input
                label="ID (no se debe cambiar)"
                value={editData.id}
                isReadOnly
              />
              <Input
                label="Nombre"
                value={editData.nombre}
                onValueChange={(val) =>
                  setEditData((prev) => ({ ...prev, nombre: val }))
                }
              />
              <Input
                label="Nombre"
                value={editData.apellido}
                onValueChange={(val) =>
                  setEditData((prev) => ({ ...prev, apellido: val }))
                }
              />
              <Input
                label="Correo"
                value={editData.email}
                onValueChange={(val) =>
                  setEditData((prev) => ({ ...prev, email: val }))
                }
              />
              <Input
                label="Documento"
                value={editData.documento}
                onValueChange={(val) =>
                  setEditData((prev) => ({ ...prev, documento: val }))
                }
              />
              <Input
                label="Rol"
                value={editData.rol}
                onValueChange={(val) =>
                  setEditData((prev) => ({ ...prev, rol: val }))
                }
              />
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <Button
                variant="bordered"
                onPress={() => setIsEditModalOpen(false)}
              >
                Cancelar
              </Button>
              <Button color="primary" onPress={handleSaveEdit}>
                Guardar
              </Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* MODAL DE AGREGAR (Botón "Agregar Usuario") */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
        <ModalContent>
          <ModalHeader>
            <h2>Agregar Usuario</h2>
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              {/* ID */}
              <Input
                label="ID (Obligatorio)"
                value={newUserData.id}
                onValueChange={(val) =>
                  setNewUserData((prev) => ({ ...prev, id: val }))
                }
              />
              {/* Nombre */}
              <Input
                label="Nombre (Obligatorio)"
                value={newUserData.nombre}
                onValueChange={(val) =>
                  setNewUserData((prev) => ({ ...prev, nombre: val }))
                }
              />
              {/* Apellido */}
              <Input
                label="Apellido (Obligatorio)"
                value={newUserData.apellido}
                onValueChange={(val) =>
                  setNewUserData((prev) => ({ ...prev, apellido: val }))
                }
              />
              {/* Correo */}
              <Input
                label="Correo (Obligatorio)"
                value={newUserData.email}
                onValueChange={(val) =>
                  setNewUserData((prev) => ({ ...prev, email: val }))
                }
              />
              {/* Documento */}
              <Input
                label="Documento (Obligatorio)"
                value={newUserData.documento}
                onValueChange={(val) =>
                  setNewUserData((prev) => ({ ...prev, documento: val }))
                }
              />
              {/* Tipo de Documento */}
              <Dropdown>
                <DropdownTrigger>
                  <Button className="capitalize" variant="bordered">
                    {newUserData.tipoDocumento || "Seleccione un tipo de documento"}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Seleccione un tipo de documento"
                  selectedKeys={new Set([newUserData.tipoDocumento])}
                  onSelectionChange={(key) =>
                    setNewUserData((prev) => ({
                      ...prev,
                      tipoDocumento: Array.from(key)[0] as string,

                    }))
                  }
                  selectionMode="single"
                  variant="flat"
                >
                  <DropdownItem key="Cédula">Cédula</DropdownItem>
                  <DropdownItem key="Pasaporte">Pasaporte</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              {/* Rol */}
              <Dropdown>
                <DropdownTrigger>
                  <Button className="capitalize" variant="bordered">
                    {newUserData.rol}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Seleccione un rol"
                  selectedKeys={new Set([newUserData.rol])}
                  onSelectionChange={(key) =>
                    setNewUserData((prev) => ({
                      ...prev,
                      rol: Array.from(key)[0] as string,
                    }))
                  }
                  selectionMode="single"
                  variant="flat"
                >
                  <DropdownItem key="Inspector">Inspector</DropdownItem>
                  <DropdownItem key="Administrador">Administrador</DropdownItem>
                  <DropdownItem key="Supervisor">Supervisor</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            {/* Botones */}
            <div className="mt-4 flex justify-end gap-2">
              <Button
                className="bg-[#EF4444] text-white"
                onPress={() => setIsAddModalOpen(false)}
              >
                Cancelar
              </Button>
              <Button className="bg-[#4E5BA6] text-white" onPress={handleAddUser}>
                Agregar
              </Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>          
    </AdministradorLayout>
  );
}