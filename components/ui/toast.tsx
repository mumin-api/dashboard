'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react'
import { create } from 'zustand'

interface Toast {
    id: string
    type: 'success' | 'error' | 'info'
    message: string
}

interface ToastStore {
    toasts: Toast[]
    addToast: (toast: Omit<Toast, 'id'>) => void
    removeToast: (id: string) => void
}

export const useToastStore = create<ToastStore>((set) => ({
    toasts: [],
    addToast: (toast) =>
        set((state) => ({
            toasts: [...state.toasts, { ...toast, id: Math.random().toString() }],
        })),
    removeToast: (id) =>
        set((state) => ({
            toasts: state.toasts.filter((t) => t.id !== id),
        })),
}))

export function ToastContainer() {
    const { toasts, removeToast } = useToastStore()

    const icons = {
        success: <CheckCircle className="w-5 h-5" />,
        error: <AlertCircle className="w-5 h-5" />,
        info: <Info className="w-5 h-5" />,
    }

    const colors = {
        success: 'bg-emerald-500',
        error: 'bg-rose-500',
        info: 'bg-sapphire-500',
    }

    return (
        <div className="fixed top-4 right-4 z-50 space-y-2">
            <AnimatePresence>
                {toasts.map((toast) => (
                    <motion.div
                        key={toast.id}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        className={`
              flex items-center space-x-3 p-4 rounded-lg shadow-lg
              bg-white border-l-4 ${colors[toast.type]}
              min-w-[300px] max-w-[400px]
            `}
                    >
                        <div className={`text-white ${colors[toast.type]}`}>
                            {icons[toast.type]}
                        </div>
                        <p className="flex-1 text-sm font-body text-charcoal">
                            {toast.message}
                        </p>
                        <button
                            onClick={() => removeToast(toast.id)}
                            className="text-charcoal/40 hover:text-charcoal"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    )
}

export function toast(message: string, type: 'success' | 'error' | 'info' = 'info') {
    useToastStore.getState().addToast({ message, type })
}
