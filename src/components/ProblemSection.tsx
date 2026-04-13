import { motion } from "framer-motion";

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
	const iconMap: { [key: string]: string } = {
		clipboard: "/icons/SV-Clipboard.webp",
		magnifying: "/icons/SV-MagnifyingGlass.webp",
		email: "/icons/SV-Email.webp",
		circular: "/icons/SV-CircularArrows.webp",
	};

	const altTextMap: { [key: string]: string } = {
		clipboard: "Clipboard icon representing scattered compliance data challenges",
		magnifying: "Magnifying glass icon representing manual audit trail problems",
		email: "Email icon representing risk visibility gaps in compliance",
		circular: "Circular arrows icon representing workflow inefficiency issues",
	};

	return (
		<img
			src={iconMap[iconType]}
			alt={altTextMap[iconType] || iconType}
			loading="lazy"
			decoding="async"
			className="w-6 h-6 object-contain drop-shadow-md"
		/>
	);
};

const ProblemSection = () => (
	<section
		id="overview"
		className="py-10 sm:py-12 md:py-14 relative overflow-hidden"
	>
		{/* Background */}
		<div className="absolute inset-0 bg-gradient-to-br from-surface-accent via-background to-primary/5" />
		<div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

		<div className="container relative px-4 sm:px-6">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className="text-center mb-8 sm:mb-10 md:mb-14"
			>
				<div className="inline-block mb-4">
					<div className="px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/30">
						<span className="text-xs md:text-sm font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
							The Challenge
						</span>
					</div>
				</div>
				<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text">
					Enterprise Compliance Challenges
				</h2>
			</motion.div>

			<div className="grid sm:grid-cols-2 gap-4 sm:gap-5 max-w-4xl mx-auto">
				{problems.map((p, i) => (
					<motion.div
						key={i}
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: i * 0.1 }}
						className="group rounded-xl sm:rounded-2xl border border-primary/20 bg-gradient-to-br from-background/40 to-primary/5 p-4 sm:p-6 transition-all duration-300 hover:-translate-y-1 cursor-default"
					>
						<div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-primary/10 flex flex-shrink-0 items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
							<IconComponent iconType={p.icon} />
						</div>
						<h3 className="text-base sm:text-lg font-bold gradient-text mb-2 sm:mb-3">
							{p.title}
						</h3>
						<p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
							{p.desc}
						</p>
					</motion.div>
				))}
			</div>
		</div>
	</section>
);

export default ProblemSection;
