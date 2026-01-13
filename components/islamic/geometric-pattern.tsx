'use client'

import { useEffect, useRef } from 'react'

interface GeometricPatternProps {
    className?: string
    variant?: 'tessellation' | 'arabesque' | 'star'
    animate?: boolean
}

export function GeometricPattern({
    className = '',
    variant = 'tessellation',
    animate = false
}: GeometricPatternProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const updateSize = () => {
            canvas.width = canvas.offsetWidth * window.devicePixelRatio
            canvas.height = canvas.offsetHeight * window.devicePixelRatio
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
        }

        updateSize()
        window.addEventListener('resize', updateSize)

        const drawPattern = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            const size = 60
            const cols = Math.ceil(canvas.offsetWidth / size) + 1
            const rows = Math.ceil(canvas.offsetHeight / size) + 1

            ctx.strokeStyle = 'rgba(245, 158, 11, 0.15)'
            ctx.lineWidth = 1

            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < cols; j++) {
                    const x = j * size
                    const y = i * size

                    if (variant === 'tessellation') {
                        drawIslamicStar(ctx, x + size / 2, y + size / 2, size / 3)
                    } else if (variant === 'arabesque') {
                        drawArabesque(ctx, x, y, size)
                    }
                }
            }
        }

        const drawIslamicStar = (
            ctx: CanvasRenderingContext2D,
            x: number,
            y: number,
            radius: number
        ) => {
            const points = 8
            ctx.beginPath()

            for (let i = 0; i < points * 2; i++) {
                const angle = (Math.PI * 2 * i) / (points * 2)
                const r = i % 2 === 0 ? radius : radius / 2
                const px = x + Math.cos(angle) * r
                const py = y + Math.sin(angle) * r

                if (i === 0) {
                    ctx.moveTo(px, py)
                } else {
                    ctx.lineTo(px, py)
                }
            }

            ctx.closePath()
            ctx.stroke()
        }

        const drawArabesque = (
            ctx: CanvasRenderingContext2D,
            x: number,
            y: number,
            size: number
        ) => {
            ctx.beginPath()
            ctx.arc(x + size / 2, y + size / 2, size / 4, 0, Math.PI * 2)
            ctx.stroke()

            ctx.beginPath()
            ctx.moveTo(x, y + size / 2)
            ctx.bezierCurveTo(
                x + size / 4,
                y,
                x + (3 * size) / 4,
                y + size,
                x + size,
                y + size / 2
            )
            ctx.stroke()
        }

        drawPattern()

        let animationId: number
        if (animate) {
            let rotation = 0
            const animatePattern = () => {
                rotation += 0.002
                ctx.save()
                ctx.translate(canvas.offsetWidth / 2, canvas.offsetHeight / 2)
                ctx.rotate(rotation)
                ctx.translate(-canvas.offsetWidth / 2, -canvas.offsetHeight / 2)
                drawPattern()
                ctx.restore()
                animationId = requestAnimationFrame(animatePattern)
            }
            animationId = requestAnimationFrame(animatePattern)
        }

        return () => {
            window.removeEventListener('resize', updateSize)
            if (animationId) {
                cancelAnimationFrame(animationId)
            }
        }
    }, [variant, animate])

    return (
        <canvas
            ref={canvasRef}
            className={`w-full h-full ${className}`}
            style={{ imageRendering: 'crisp-edges' }}
        />
    )
}
