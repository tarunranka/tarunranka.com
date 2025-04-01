import Head from 'next/head'
import { PortableText } from 'next-sanity'


export default function Resume(
	resume: Partial<Sanity.Resume>,
) {
	console.log('[DEBUG] Resume component:', resume);
	if (!resume) return null

	return (
		<>
			<main className="max-w-4xl mx-auto px-6 py-12 text-sm leading-relaxed text-gray-800">
				{/* Header */}
				<header className="mb-12">
					<h1 className="text-4xl font-bold text-gray-900">{resume.name}</h1>
					<a
						href={`mailto:${resume.email}`}
						className="text-blue-600 underline hover:text-blue-800 block mt-1"
					>
						{resume.email}
					</a>
				</header>

				{/* Overview */}
				{(resume?.overview ?? []).length > 0 && (
					<section className="mb-12">
						<h2 className="text-xl font-semibold text-gray-900 mb-2">Overview</h2>
						<div className="space-y-2">
							<PortableText value={resume.overview ?? []} />
						</div>
					</section>
				)}

				{/* Experience Timeline */}
				{(resume.experience ?? []).length > 0 && (
					<section className="mb-12">
						<h2 className="text-xl font-semibold text-gray-900 mb-6">Experience</h2>
						<div className="border-l-4 border-gray-700">
							{(resume.experience ?? []).map((job, i) => (
								<div key={i} className="relative">
									{/* Timeline Marker */}
									<div className="absolute -left-3 w-5 h-5 bg-white border-4 border-gray-700 rounded-full"></div>
									<div className="ml-6 mb-8">
										{/* Date */}
										<div className="text-sm text-gray-500 mb-1">{job.duration}</div>

										{/* Role & Company */}
										<h3 className="text-lg font-semibold text-gray-900">{job.role}</h3>
										<p className="text-gray-500 italic mb-2">{job.company}</p>

										{/* Technologies */}
										{job.technologies && (
											<p className="text-xs text-gray-600 mb-1">{job.technologies}</p>
										)}

										{/* Responsibilities */}
										<div className="mt-2">
											<PortableText value={job.responsibilities} />
										</div>
									</div>
								</div>
							))}
						</div>
					</section>
				)}

				{/* Education */}
				{(resume.education ?? []).length > 0 && (
					<section className="mb-12">
						<h2 className="text-xl font-semibold text-gray-900 mb-4">Education</h2>
						<div className="space-y-8">
							{(resume.education ?? []).map((edu, i) => (
								<div key={i}>
									<h3 className="font-semibold text-gray-800 text-lg">{edu.institution}</h3>
									<p className="text-sm italic text-gray-500">
										{edu.degree} — {edu.duration}
									</p>
									<div className="mt-1">
										<PortableText value={edu.details} />
									</div>
								</div>
							))}
						</div>
					</section>
				)}

				{/* Skills */}
				<section>
					<h2 className="text-xl font-semibold text-gray-900 mb-4">Skills & Technologies</h2>
					<ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
						{resume.technologies && (
							<li>
								<strong>Languages / Frameworks:</strong> {resume.technologies.join(', ')}
							</li>
						)}
						{resume.databases && (
							<li>
								<strong>Databases:</strong> {resume.databases.join(', ')}
							</li>
						)}
						{resume.tooling && (
							<li>
								<strong>Tooling:</strong> {resume.tooling.join(', ')}
							</li>
						)}
					</ul>
				</section>
			</main>
		</>
	)
}


