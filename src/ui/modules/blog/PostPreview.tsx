import Link from 'next/link'
import resolveUrl from '@/lib/resolveUrl'
import { Img } from '@/ui/Img'
import Date from '@/ui/Date'
import Categories from './Categories'
import Authors from './Authors'
import { cn } from '@/lib/utils'

export default function PostPreview({
	post,
	skeleton,
}: {
	post?: Sanity.BlogPost
	skeleton?: boolean
}) {
	if (!post && !skeleton) return null

	return (
		<div className="group relative isolate flex h-full flex-col space-y-2">


			<div className={cn('h4', skeleton && 'skeleton-2')}>
				<Link
					className="group-hover:underline"
					href={resolveUrl(post, { base: false })}
				>
					<span className="absolute inset-0" />
					{post?.metadata.title}
				</Link>
			</div>

			<div className="grow">
				<p className="line-clamp-3 text-sm empty:h-[3lh]">
					{post?.metadata.description}
				</p>
			</div>

			{(post?.authors?.length || skeleton) && (
				<Authors
					className="flex flex-wrap items-center gap-4 text-sm"
					authors={post?.authors}
					skeleton={skeleton}
				/>
			)}

			<hr />

			<div className="empty:skeleton flex flex-wrap gap-x-4 text-sm">
				<Date value={post?.publishDate} />
				<Categories
					className="flex flex-wrap gap-x-2"
					categories={post?.categories}
				/>
			</div>
		</div>
	)
}
