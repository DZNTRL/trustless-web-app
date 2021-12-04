import React from "react"
import { ComponentStory, ComponentMeta, storiesOf } from "@storybook/react"
import App from "pro-web-app-cli-components/dist/js/App"

import CheckUsername from "pro-web-app-cli-components/src/components/CheckUsername/CheckUsername"

export default {
  title: "Check Username",
  component: CheckUsername
} as ComponentMeta<typeof CheckUsername>

const Template: ComponentStory<typeof CheckUsername> = (args) => <App><CheckUsername {...args} /></App>

