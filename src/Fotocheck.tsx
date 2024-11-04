import "./Fotocheck.css"; // Importamos el archivo de estilos CSS para el componente
import { QRCodeSVG } from "qrcode.react"; // Si prefieres usar SVG

// Definimos las propiedades que acepta el componente Cena
interface FotocheckProps {
  codigo: string;
  dni: string;
  nombres: string;
  area: string;
  grupo: string;
  sede: string;
  direccion: string;
  region: string;
  logo: string;
  empresa: string,
  ruc: string
}

// Componente Cena que recibe las propiedades definidas
function Fotocheck({
  codigo,
  dni,
  nombres,
  area,
  grupo,
  sede,
  direccion,
  region,
  logo,
  empresa,
  ruc,
}: FotocheckProps) {
  // const sede = "FDO. JAYANCA";
  // const direccion = "Fundo Jayanca V. Fundo U.C 11420 la Viña";
  // const region = "Jayanca, Lambayeque, Lambayeque";

  // const sede = "FDO. OLMOS I";
  // const direccion = "Rios Cascajal y Olmos lt.C7 (Ramal sur PEOT)";
  // const region = "Olmos, Lambayeque, Lambayeque";
  //20297939131 BETA
  return (
    <>
      <div className="fotocheck">
        {/*CABECERA */}
        <div className="cabecera">
          <img className="logo" src={logo} />
          <div className="titulo">
            <p className="titulo-empresa">{empresa}</p>
            <span className="ruc">RUC: {ruc}</span>
          </div>
        </div>
        {/*FIN CABECERA*/}

        {/*CUERPO*/}
        <p className="nombre">{nombres.toUpperCase()}</p>
        <div className="cuerpo-datos">
          <div className="cuerpo">
            <p>
              <span className="negrita">CODIGO:</span> {codigo}
            </p>
            <p>
              <span className="negrita">DNI:</span> {dni}
            </p>
            <p>
              <span className="negrita">AREA:</span> {area.toUpperCase()}
            </p>
            <p>
              <span className="negrita">SEDE:</span> {sede.toUpperCase()}
            </p>
          </div>
          <center>
            <div className="qr-container">
              <QRCodeSVG value={dni.toString()} key={dni} size={60} />
            </div>
          </center>
        </div>
        {/*FOOTER */}
        <div className="footer">
          <p>{direccion}</p>
          <p>
            {region} - <span className="grupo">{grupo}</span>
          </p>
        </div>
      </div>
    </>
  );
}

export default Fotocheck; // Exportamos el componente Cena
