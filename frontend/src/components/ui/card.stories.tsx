import type { Meta, StoryObj } from '@storybook/react'
import { Card } from './card'

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Card>

export const Default: Story = {
  render: () => (
    <Card className="max-w-md">
      <h3 className="text-lg font-semibold">Carte de base</h3>
      <p className="mt-2 text-sm text-muted">
        Ce composant sert à afficher un contenu sur un fond de surface avec bordures et ombre.
      </p>
    </Card>
  ),
}
