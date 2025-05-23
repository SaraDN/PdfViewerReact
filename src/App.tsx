import { useState } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.js", import.meta.url).toString();

const pdfs = [
	{
		name: "Calendar financiar 2025",
		file: "CALENDAR_FINANCIAR_2025.pdf",
	},
	{
		name: "CMIL raport curent Nr. 2",
		file: "CMI_ RAPORT_CURENT_NR_2.pdf",
	},
	{
		name: "CMIL raport curent Nr. 3",
		file: "CMIL_Raport_curent_nr_3.pdf",
	},
	{
		name: "CMIL raport curent Nr. 4",
		file: "CMIL_Raport_curent_nr_4.pdf",
	},
	{
		name: "CMIL raport curent Nr. 6",
		file: "CMIL_RAPORT_CURENT_NR_6.pdf",
	},
	{
		name: "CMIL raport curent Nr. 7",
		file: "CMIL_Raport_current_nr_7.pdf",
	},
	{
		name: "CMIL raport curent Nr. 8",
		file: "CMIL_Raport_curent_nr_8.pdf",
	},
	{
		name: "Raport audit COMCEREAL 2024",
		file: "Raport_audit_Comcereal_2024.pdf",
	},
	{
		name: "Nota de fundamentare",
		file: "NOT_D_FUNDAMENTARE.pdf",
	},
	{
		name: "Adresa intrebari",
		file: "adresa_intrebari.pdf",
	},
	{
		name: "Politica remunerare",
		file: "Politica_remunerare_2025.pdf",
	},
	{
		name: "Raspuns adresa",
		file: "Raspuns_adresa_996.pdf",
	},
	{
		name: "Comunicat publicare raport anual 2024",
		file: "COMUNICAT_PUBLICARE_RAPORT_ANUAL_2024.pdf",
	},
	{
		name: "Declaratie privind guvernanta corporativa 2024",
		file: "DECLARATIE_PRIVIND_GUVERNANTA_CORPORATIVA_2024.pdf",
	},
];

const PDF = ({
	file,
	name,
	active,
	setActive,
}: {
	file: string;
	name: string;
	active: boolean;
	setActive: () => void;
}) => {
	const [pageNumber, setPageNumber] = useState(1);

	const isMobile = window.innerWidth < 768;

	return (
		<div className="relative border rounded h-fit grow-0 group border-zinc-300">
			{active && (
				<div className="absolute bottom-0 left-0 right-0 z-50 flex justify-between gap-5 p-5 transition-all opacity-0 text-zinc-900 bg-zinc-200 group-hover:opacity-100">
					<button onClick={() => setPageNumber((prev) => prev - 1)} disabled={pageNumber === 1}>
						Previous
					</button>
					<p>Page {pageNumber}</p>
					<button onClick={() => setPageNumber((prev) => prev + 1)}>Next</button>
				</div>
			)}
			{!active && (
				<button
					className="absolute bottom-0 left-0 right-0 z-50 flex justify-between gap-5 p-5 transition-all text-zinc-900 bg-zinc-200"
					onClick={() => setActive()}>
					View - {name}
				</button>
			)}
			{active && (
				<button className="absolute top-0 right-0 z-50 p-5 text-zinc-900 bg-zinc-200" onClick={() => setActive()}>
					close
				</button>
			)}
			<Document file={file}>
				<Page
					pageNumber={pageNumber}
					renderAnnotationLayer={false}
					height={active ? window.innerWidth - 200 : 400}
					width={isMobile ? window.innerWidth - 40 : undefined}
				/>
			</Document>
		</div>
	);
};

function App() {
	const [active, setActive] = useState(-1);

	return (
		<main className="w-screen h-screen p-5 overflow-auto md:px-20 bg-zinc-50">
			<div className="flex flex-wrap gap-5">
				{active === -1 &&
					pdfs.map((pdf, index) => (
						<PDF
							key={index}
							file={pdf.file}
							name={pdf.name}
							active={active === index}
							setActive={() => setActive(active !== index ? index : -1)}
						/>
					))}
				{active !== -1 && (
					<PDF file={pdfs[active].file} name={pdfs[active].name} active={true} setActive={() => setActive(-1)} />
				)}
			</div>
		</main>
	);
}

export default App;
