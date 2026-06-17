import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Button } from './button'
import { Toast } from './toast'

const meta: Meta<typeof Toast> = {
  title: 'UI/Toast',
  component: Toast,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Toast>

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(true)

    return (
      <div className="min-h-screen bg-background p-8">
        <Button onClick={() => setOpen(true)}>Montrer le toast</Button>
        <Toast
          open={open}
          title="Notification"
          description="Message informatif pour l'utilisateur"
          onClose={() => setOpen(false)}
        />
      </div>
    )
  },
}
