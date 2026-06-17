import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './button'

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    children: 'Bouton primaire',
    variant: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Bouton secondaire',
    variant: 'secondary',
  },
}

export const Danger: Story = {
  args: {
    children: 'Bouton danger',
    variant: 'danger',
  },
}
