import React, { useState } from "react";
import Fotocheck from "./Fotocheck";
import "./App.css";
import * as XLSX from "xlsx";

interface Trabajador {
  CODIGO: string;
  DNI: string;
  NOMBRES: string;
  AREA: string;
  GRUPO: string;
}

function App() {
  const [trabajadores, setTrabajadores] = useState<Trabajador[]>([]);
  //const [verInput, setverInput] = useState(true);

  const [sede, setSede] = useState("FDO Jayanca");
  // const [direccion, setDireccion] = useState(
  //   "Fundo Jayanca V. Fundo U.C 11420 la Viña"
  // );
  // const [region, setRegion] = useState("Jayanca, Lambayeque, Lambayeque");
  const [logo, setLogo] = useState("./logo-beta.png");
  const [empresa, setEmpresa] = useState("COMPLEJO AGROINDUSTRIAL BETA S.A");
  const [ruc, setRuc] = useState("20297939131");

  const handleSedeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSede = event.target.value;
    setSede(selectedSede);

    switch (selectedSede) {
      case "FDO Jayanca":
        // setDireccion("Fundo Jayanca V. Fundo U.C 11420 la Viña");
        // setRegion("Jayanca, Lambayeque, Lambayeque");
        setLogo("./logo-beta.png");
        setEmpresa("COMPLEJO AGROINDUSTRIAL BETA S.A");
        setRuc("20297939131");
        break;
      case "Olmos I":
        // setDireccion("Rios Cascajal y Olmos lt.C7 (Ramal sur PEOT)");
        // setRegion("Olmos, Lambayeque, Lambayeque");
        setLogo("./logo-beta.png"); // Cambia al logo correspondiente
        setEmpresa("COMPLEJO AGROINDUSTRIAL BETA S.A");
        setRuc("20297939131");
        break;
      case "Olmos II":
        // setDireccion("Lote C-1 (Ramal Sur PEOT)");
        // setRegion("Olmos, Lambayeque, Lambayeque");
        setLogo("./logo-beta.png"); // Cambia al logo correspondiente
        setEmpresa("COMPLEJO AGROINDUSTRIAL BETA S.A");
        setRuc("20297939131");
        break;
      case "Perufresh":
        // setDireccion("Zona de Huaca Bandera S/N (parte baja)");
        // setRegion("Pacora, Lambayeque, Lambayeque");
        setLogo("./logo-pf.png"); // Cambia al logo correspondiente
        setEmpresa("PERU FRESH FRUITS & VEGETABLES SAC");
        setRuc("20534963778");
        break;
      default:
        // setDireccion("");
        // setRegion("");
        setLogo("");
    }
  };

  const leerExcel = (e: React.ChangeEvent<HTMLInputElement>) => {
    const archivo = e.target.files?.[0];
    if (!archivo) return;
    //setverInput(false);

    const reader = new FileReader();
    reader.onload = (e) => {
      const datos = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(datos, { type: "array" });
      const hoja = workbook.Sheets[workbook.SheetNames[0]];
      const jsonDatos = XLSX.utils.sheet_to_json<Trabajador>(hoja);
      console.log("Datos cargados del Excel:", jsonDatos); // Verificar los datos
      setTrabajadores(jsonDatos);
    };
    reader.readAsArrayBuffer(archivo);
    e.target.value = ""; // Limpia el selector de archivo

    //Ocultar elemento
    const modal = e.currentTarget.parentNode as HTMLElement;
    if (modal) {
      modal.style.display = "none"; // Oculta el contenedor
    }
  };

  return (
    <>
      {/* Contenedor solo para la selección */}
      <div className="contenedor-seleccion">
        <h1 className="titulo-principal">COMPLEJO AGROINDUSTRIAL BETA</h1>
        <h3 className="titulo-secundario">GENERACIÓN DE FOTOCHECK</h3>
        {/* Selector de sede */}
        <div className="sede-selector">
          <label htmlFor="sede">Seleccione sede:</label>
          <select id="sede" value={sede} onChange={handleSedeChange}>
            <option value="">--Seleccione una sede--</option>
            <option value="FDO Jayanca">FDO JAYANCA</option>
            <option value="Olmos I">FDO OLMOS I</option>
            <option value="Olmos II">FDO OLMOS II</option>
            <option value="Perufresh">FDO PERUFRESH</option>
          </select>
        </div>

        {/* Botón de selección de Excel */}
        <input type="file" className="btn" onChange={leerExcel} />
        {/* Enlace para descargar el archivo de plantilla */}
        <a href="./plantilla-fotocheck.xlsx" download="plantilla-fotocheck.xlsx" className="btn-descargar">
        Descargar plantilla
      </a>
      </div>

      <div className="contenedor">
        {trabajadores.map((dato: any, index) => {
          console.log(dato.DNI); // Verifica que el DNI sea único
          return (
            <Fotocheck
              key={index}
              codigo={dato.CODIGO}
              dni={dato.DNI}
              nombres={dato.NOMBRES}
              area={dato.AREA}
              grupo={dato.GRUPO}
              // sede={sede}
              // direccion={direccion}
              // region={region}
              logo={logo}
              empresa={empresa}
              ruc={ruc}
            />
          );
        })}
      </div>
    </>
  );
}

export default App;
