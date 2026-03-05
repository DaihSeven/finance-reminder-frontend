import { type ReactNode } from 'react'
import Sidebar from '@/components/Sidebar'
import styles from './MainLayout.module.css'

interface Props {
  children: ReactNode
}

export default function MainLayout({ children }: Props) {
  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <main className={styles.content}>
        {children}
      </main>
    </div>
  )
}