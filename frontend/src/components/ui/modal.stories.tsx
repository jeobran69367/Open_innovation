import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Modal } from './modal'
import { Button } from './button'

const meta: Meta<typeof Modal> = {
  title: 'UI/Modal',
  component: Modal,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Modal>

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(true)

    return (
      <div className="min-h-screen bg-background p-8">
        <Button onClick={() => setOpen(true)}>Ouvrir la modale</Button>
        <Modal open={open} title="Titre de la modale" onClose={() => setOpen(false)}>
          <p className="text-sm text-muted">
            Ceci est un exemple de modal accessible avec un focus trap clavier et un retour sur Escape.
          </p>
        </Modal>
      </div>
    )
  },
}
