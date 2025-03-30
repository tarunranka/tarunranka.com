import { preload } from 'react-dom'
import { getImageDimensions } from '@sanity/asset-utils'
import { urlFor } from '@/sanity/lib/image'
import NextImage, { type ImageProps } from 'next/image'
import type { ComponentProps } from 'react'
import { stegaClean } from 'next-sanity'

type ImgProps = { alt?: string } & Omit<ImageProps, 'src' | 'alt'>

export function ResponsiveImg({
	img,
	pictureProps,
	...props
}: {
	img?: Sanity.Img
	pictureProps?: ComponentProps<'picture'>
} & ImgProps) {
	if (!img) return null

	const { responsive, ...imgProps } = img

	return (
		<picture {...pictureProps}>
			{responsive?.map((r, key) => <Source {...r} key={key} />)}
			<Img {...imgProps} {...props} />
		</picture>
	)
}

export function Img({
	image,
	width: w,
	height: h,
	...props
}: { image?: Sanity.Image } & ImgProps) {
	if (!image?.asset) return null

	const { src, width, height } = generateSrc(image, w, h)

	if (stegaClean(image.loading) === 'eager') {
		preload(src, { as: 'image' })
	}

	return (
		<NextImage
			src={src}
			width={width}
			height={height}
			alt={props.alt || image.alt || ''}
			loading={stegaClean(image.loading)}
			{...props}
		/>
	)
}

export function Source({
	image,
	media = '(width < 48rem)',
	width: w,
	height: h,
	...props
}: {
	image?: Sanity.Image
} & ComponentProps<'source'>) {
	if (!image?.asset) return null

	const { src, width, height } = generateSrc(image, w, h)

	if (stegaClean(image.loading) === 'eager') {
		preload(src, { as: 'image' })
	}

	return (
		<source
			srcSet={src}
			width={width}
			height={height}
			media={media}
			{...props}
		/>
	)
}

function generateSrc(
	image: Sanity.Image,
	w?: number | `${number}` | string,
	h?: number | `${number}` | string,
) {
	const { width: w_orig, height: h_orig } = getImageDimensions(image)

	const w_calc = !!w // if width is provided
		? Number(w)
		: // if height is provided, calculate width
			!!h && Math.floor((Number(h) * w_orig) / h_orig)

	const h_calc = !!h // if height is provided
		? Number(h)
		: // if width is provided, calculate height
			!!w && Math.floor((Number(w) * h_orig) / w_orig)

	return {
		src: urlFor(image)
			.withOptions({
				width: !!w ? Number(w) : undefined,
				height: !!h ? Number(h) : undefined,
				auto: 'format',
			})
			.url(),
		width: w_calc || w_orig,
		height: h_calc || h_orig,
	}
}
