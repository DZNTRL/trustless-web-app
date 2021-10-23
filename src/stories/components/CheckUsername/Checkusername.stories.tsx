import React from "react"
import { ComponentStory, ComponentMeta, storiesOf } from "@storybook/react"
import App from "../../../client/App"

import CheckUsername from "../../../client/components/CheckUsername/CheckUsername"

export default {
  title: "Check Username",
  component: CheckUsername
} as ComponentMeta<typeof CheckUsername>

const Template: ComponentStory<typeof CheckUsername> = (args) => <App><CheckUsername {...args} /></App>

