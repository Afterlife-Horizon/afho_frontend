import React, { useState } from "react"
import Image from "next/image"

const ImageWithFallback = ({
	className,
	src,
	fallbackSrc,
	alt,
	width,
	height,
	draggable = true
}: {
	className: string
	src: string
	fallbackSrc: string
	alt: string
	width: number
	height: number
	draggable?: boolean
}) => {
	const [imgSrc, setImgSrc] = useState(src)
	return (
		<Image
			draggable={draggable}
			className={className}
			src={imgSrc}
			onError={() => setImgSrc(fallbackSrc)}
			alt={alt}
			width={width}
			height={height}
		/>
	)
}

export default ImageWithFallback
