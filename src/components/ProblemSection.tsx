import { motion } from "framer-motion";
import { FileText, Search, AlertCircle, Workflow } from "lucide-react";

const problems = [
	{
		icon: "clipboard",
		title: "Scattered Compliance Data",
		desc: "Compliance data sits in Excel, emails, shared drives, and different tools. There is no single, real-time view of compliance across the organization.",
	},
	{
		icon: "magnifying",
		title: "Manual Audit Trails",
		desc: "Teams spend days collecting documents, chasing responses, and compiling evidence, increasing the risk of errors and audit findings.",
	},
	{
		icon: "email",
		title: "Risk Visibility Gaps",
		desc: "Without real-time visibility, compliance gaps are often discovered only during audits or after an incident.",
	},
	{
		icon: "circular",
		title: "Workflow Inefficiency",
		desc: "Approvals happen over email and across disconnected systems delaying audits, vendor onboarding, and risk assessments.",
	},
];

const IconComponent = ({ iconType }: { iconType: string }) => {
	const iconMap: { [key: string]: JSX.Element } = {
		clipboard: <FileText className="w-6 h-6" strokeWidth={1.5} />,
		magnifying: <Search className="w-6 h-6" strokeWidth={1.5} />,
		email: <AlertCircle className="w-6 h-6" strokeWidth={1.5} />,
		circular: <Workflow className="w-6 h-6" strokeWidth={1.5} />,
	};

	return (
		<div className="drop-shadow-md flex items-center justify-center w-full h-full">
			{iconMap[iconType] || iconMap.clipboard}
		</div>
	);
};

const ProblemSection = () => (
	<section
		id="overview"
		className="py-16 sm:py-20 md:py-24 relative overflow-hidden bg-gradient-to-br from-red-50/50 via-white to-orange-50/30"
	>
		{/* Subtle accent decorations */}
		<div className="absolute top-0 right-0 w-96 h-96 bg-red-100/20 rounded-full blur-3xl -z-10" />
		<div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-100/20 rounded-full blur-3xl -z-10" />

		<div className="container relative z-10 px-4 sm:px-6">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className="text-center mb-12 md:mb-16"
			>
				<span className="text-xs md:text-sm font-semibold text-[#37C643] uppercase tracking-wider">
					The Challenge
				</span>
				<h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 px-4 mt-4">
					Enterprise <span className="text-[#37C643]">Compliance</span> Challenges
				</h2>
				<p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto px-4 mt-3">
					Common obstacles organizations face in managing compliance
				</p>
			</motion.div>

			<div className="grid sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto">
				{problems.map((p, i) => (
					<motion.div
						key={i}
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: i * 0.1 }}
						className="group relative"
					>
					<div className={`rounded-2xl border border-slate-200 bg-white p-6 md:p-8 h-full relative overflow-hidden shadow-sm transition-all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) card-hover-primary flex flex-col`}>
						<div
							className="card-icon w-12 h-12 rounded-2xl bg-[#37C643]/10 border border-[#37C643]/20 flex items-center justify-center flex-shrink-0 mb-4 transition-transform transform-none"
						>
							<div className="text-[#37C643] flex items-center justify-center w-full h-full">
								<IconComponent iconType={p.icon} />
							</div>
						</div>
							<h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 mb-3">
								{p.title}
							</h3>
							<p className="text-sm md:text-base text-slate-600 leading-relaxed flex-1">
								{p.desc}
							</p>
						</div>
					</motion.div>
				))}
			</div>
		</div>
	</section>
);

export default ProblemSection;
