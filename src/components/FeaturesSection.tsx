import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, CheckCircle, FileText, Shield, BarChart3, Zap, Search, Smartphone } from "lucide-react";

const features = [
	{
		icon: "clipboard",
		title: "Policy Management",
		desc: "Centralized repository with version control and policy lifecycle management.",
		benefits: ["Version control", "Centralized storage", "Lifecycle tracking"],
	},
	{
		icon: "dartboard",
		title: "Access Control",
		desc: "Role-based permissions and segregation of duties for enterprise security.",
		benefits: ["Role-based access", "Duty segregation", "Audit trails"],
	},
	{
		icon: "chart",
		title: "Compliance Reporting",
		desc: "Pre-built reports for SOC2, ISO, GDPR and custom regulatory frameworks.",
		benefits: ["Pre-built reports", "Multi-framework", "Custom exports"],
	},
	{
		icon: "lightning",
		title: "Deadline Tracking",
		desc: "Automated compliance reminders and deadline management with escalations.",
		benefits: ["Auto reminders", "Escalations", "Real-time updates"],
	},
	{
		icon: "magnifying",
		title: "Audit Management",
		desc: "Evidence collection, audit trail management, and finding resolution.",
		benefits: ["Evidence tracking", "Audit trails", "Finding manager"],
	},
	{
		icon: "mobile",
		title: "Mobile Access",
		desc: "Manage compliance on-the-go with full mobile Salesforce experience-driven visibility.",
		benefits: ["Mobile app", "Full sync", "Offline support"],
	},
];

const IconComponent = ({ iconType }: { iconType: string }) => {
	const iconMap: { [key: string]: JSX.Element } = {
		clipboard: <FileText className="w-8 h-8" strokeWidth={1.5} />,
		dartboard: <Shield className="w-8 h-8" strokeWidth={1.5} />,
		chart: <BarChart3 className="w-8 h-8" strokeWidth={1.5} />,
		lightning: <Zap className="w-8 h-8" strokeWidth={1.5} />,
		magnifying: <Search className="w-8 h-8" strokeWidth={1.5} />,
		circular: <Smartphone className="w-8 h-8" strokeWidth={1.5} />,
		mobile: <Smartphone className="w-8 h-8" strokeWidth={1.5} />
	};

	return (
		<div className="drop-shadow-md flex items-center justify-center w-full h-full">
			{iconMap[iconType] || iconMap.clipboard}
		</div>
	);
};

const FeaturesSection = () => {
	const [activeIndex, setActiveIndex] = useState(0);

	const carouselIndex = Math.floor(activeIndex / 2);
	const visibleFeatures = [features[activeIndex], features[activeIndex + 1]].filter(Boolean);

	useEffect(() => {
		const interval = setInterval(() => {
			setActiveIndex((prev) => {
				const nextIndex = prev + 2;
				return nextIndex >= features.length ? 0 : nextIndex;
			});
		}, 3000);
		return () => clearInterval(interval);
	}, []);

	const goToPrevious = () => {
		setActiveIndex((prev) => (prev === 0 ? Math.max(0, features.length - 2) : prev - 2));
	};

	const goToNext = () => {
		setActiveIndex((prev) => {
			const nextIndex = prev + 2;
			return nextIndex >= features.length ? 0 : nextIndex;
		});
	};

	return (
		<section id="features" className="py-16 sm:py-20 md:py-24 relative overflow-hidden bg-gradient-to-br from-green-50/50 via-white to-emerald-50/40">
			<div className="absolute top-0 left-0 w-72 h-72 bg-green-100/20 rounded-full blur-3xl -z-10" />
			<div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-100/25 rounded-full blur-3xl -z-10" />

			<div className="container relative z-10 px-4 sm:px-6">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
					className="text-center mb-12 md:mb-16 lg:mb-20 px-4"
				>
					<div className="inline-block">
						<span className="text-xs md:text-sm font-semibold text-[#37C643] uppercase tracking-wider">
							Powerful Capabilities
						</span>
					</div>
					<h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-3 md:mb-4 lg:mb-6 text-slate-900 px-4 mt-4">
						Enterprise <span className="text-[#37C643]">Features</span>
					</h2>
					<p className="text-sm md:text-base lg:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed px-4">
						Comprehensive compliance management tools designed for modern enterprises.
					</p>
				</motion.div>

				<div className="max-w-6xl mx-auto">
					{/* Explicit wrapper height to mathematically prevent any layout shifting during frame updates */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8 md:mb-10 items-stretch h-[536px] sm:h-[544px] md:h-[280px] lg:h-[260px] xl:h-[240px] overflow-hidden">
						{visibleFeatures.map((feature, idx) => (
							<motion.div
								key={activeIndex + idx}
								initial={{ opacity: 0, scale: 0.95, y: 20 }}
								animate={{ opacity: 1, scale: 1, y: 0 }}
								transition={{ duration: 0.5, delay: idx * 0.1 }}
								className="group relative h-full"
							>
								{/* ✅ Only mobile height changed: h-[300px] → h-[220px] */}
								<div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 md:p-7 h-[260px] md:h-[280px] lg:h-[260px] xl:h-[240px] relative overflow-hidden shadow-sm w-full justify-between">

									<div className="flex items-center gap-4 mb-2 flex-row text-left">
										<motion.div
											className="card-icon w-14 h-14 rounded-2xl bg-[#37C643]/10 border border-[#37C643]/20 flex items-center justify-center flex-shrink-0 transition-transform"
										>
											<div className="text-[#37C643] flex items-center justify-center w-full h-full">
												<IconComponent iconType={feature.icon} />
											</div>
										</motion.div>
										<motion.h3 className="text-lg md:text-xl font-bold text-slate-900">
											{feature.title}
										</motion.h3>
									</div>

									<motion.p className="text-sm md:text-base text-slate-600 leading-relaxed mb-2 font-medium">
										{feature.desc}
									</motion.p>

									<motion.div className="mt-1">
										<div className="space-y-1">
											{feature?.benefits && feature.benefits.length > 0 ? (
												feature.benefits.map((benefit, bidx) => (
													<motion.div
														key={bidx}
														className="flex items-start gap-2 text-xs md:text-sm"
														initial={{ opacity: 0, x: -10 }}
														animate={{ opacity: 1, x: 0 }}
														transition={{ delay: 0.2 + bidx * 0.1 }}
													>
														<CheckCircle className="w-4 h-4 text-[#37C643] flex-shrink-0 mt-0.5" />
														<span className="text-slate-700 leading-tight">{benefit}</span>
													</motion.div>
												))
											) : null}
										</div>
									</motion.div>
								</div>
							</motion.div>
						))}
					</div>

					{/* Navigation Controls */}
					<div className="flex items-center justify-center gap-4 mt-6 md:mt-8">
						<motion.button
							onClick={goToPrevious}
							aria-label="Previous features"
							className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:border-[#37C643] hover:bg-[#37C643]/5 transition-all duration-300"
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.95 }}
						>
							<ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-[#37C643]" />
						</motion.button>

						<div className="flex gap-1.5 md:gap-2">
							{[0, 1, 2].map((index) => (
								<motion.button
									key={index}
									onClick={() => setActiveIndex(index * 2)}
									aria-label={`Go to features group ${index + 1}`}
									style={{ minHeight: 'unset' }}
									className={`transition-all duration-300 rounded-full relative min-h-0 ${
										carouselIndex === index
											? "bg-[#37C643] w-5 md:w-6 h-2 md:h-2.5"
											: "bg-slate-300 w-2 md:w-2.5 h-2 md:h-2.5 hover:bg-slate-400"
									}`}
									whileHover={{ scale: 1.2 }}
								>
									<span className="absolute inset-[-8px] md:inset-[-12px]" aria-hidden="true" />
								</motion.button>
							))}
						</div>

						<motion.button
							onClick={goToNext}
							aria-label="Next features"
							className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:border-[#37C643] hover:bg-[#37C643]/5 transition-all duration-300"
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.95 }}
						>
							<ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-[#37C643]" />
						</motion.button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default FeaturesSection;