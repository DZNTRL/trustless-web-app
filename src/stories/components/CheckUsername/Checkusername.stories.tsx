import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"

import CheckUsername from "../../../client/components/CheckUsername/CheckUsername"

export default {
  title: "Check Username",
  component: CheckUsername
} as ComponentMeta<typeof CheckUsername>

const Template: ComponentStory<typeof CheckUsername> = (args) => <CheckUsername {...args} />

export const IsReady = Template.bind({})
IsReady.args = {
  loading: false,
  result: null
}

export const IsLoading = Template.bind({})
IsLoading.args = {
    loading: true,
    result: null
}

