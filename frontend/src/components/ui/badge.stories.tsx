import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './badge'

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Badge>

export const Primary: Story = {
  args: {
    children: 'Principal',
    variant: 'primary',
  },
}

export const Success: Story = {
  args: {
    children: 'Succès',
    variant: 'success',
  },
}

export const Danger: Story = {
  args: {
    children: 'Danger',
    variant: 'danger',
  },
}
