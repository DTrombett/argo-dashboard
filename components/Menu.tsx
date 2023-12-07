import attività from "../icons/attivita-svolta.svg";
import bachecaAlunno from "../icons/bacheca-alunno.svg";
import bacheca from "../icons/bacheca.svg";
import appello from "../icons/calendario.svg";
import compiti from "../icons/compiti-assegnati.svg";
import condivisione from "../icons/condivisione-documenti.svg";
import curriculum from "../icons/curriculum.svg";
import note from "../icons/note-personali.svg";
import orario from "../icons/orario.svg";
import promemoria from "../icons/promemoria-classe.svg";
import ricevimento from "../icons/ricevimento-docenti.svg";
import pagamenti from "../icons/tasse-icon.svg";
import votiGiornalieri from "../icons/voti-giornalieri.svg";
import votiScrutinio from "../icons/voti-scrutinio.svg";
import MenuEntry from "./MenuEntry";

const Menu = () => (
	<div className="container flex flex-wrap justify-evenly my-2">
		<MenuEntry color="#07abbe" icon={appello} name="Eventi appello" />
		<MenuEntry color="#ffb498" icon={note} name="Note" />
		<MenuEntry color="#e06f5c" icon={votiGiornalieri} name="Voti giornalieri" />
		<MenuEntry color="#9f72d5" icon={votiScrutinio} name="Voti scrutinio" />
		<MenuEntry color="#3e90d8" icon={attività} name="Attività svolta" />
		<MenuEntry color="#7080fe" icon={compiti} name="Compiti assegnati" />
		<MenuEntry color="#ff5d63" icon={promemoria} name="Promemoria" />
		<MenuEntry color="#f8b3ca" icon={orario} name="Orario" />
		<MenuEntry color="#90c078" icon={ricevimento} name="Ricevimento docenti" />
		<MenuEntry color="#06aabe" icon={bacheca} name="Bacheca" />
		<MenuEntry color="#07abbe" icon={bachecaAlunno} name="Bacheca alunno" />
		<MenuEntry color="#45dda1" icon={condivisione} name="Condivisione" />
		<MenuEntry color="#07abbe" icon={pagamenti} name="Pagamenti" />
		<MenuEntry color="#385a90" icon={curriculum} name="Curriculum" />
	</div>
);

export default Menu;
