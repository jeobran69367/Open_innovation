import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './input'

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    id: 'example-input',
    label: 'Champ de saisie',
    description: 'Description du champ',
    placeholder: 'Saisissez du texte…',
  },
}

export const Error: Story = {
  args: {
    id: 'example-input-error',
    label: 'Champ invalide',
    description: 'Ce champ est requis.',
    error: 'Erreur de validation',
  },
}
