import React from "react";
import { Step, Icon } from "semantic-ui-react";

const Stepper = ({ steps }) => (
  <Step.Group>
    {steps
      ? steps.map((step) => {
          return (
            <Step
              completed={step.completed}
              active={step.active}
              disabled={(!step.completed && !step.active)}
            >
              {step.active ? <Icon name="settings" /> : <Icon name="payment" />}
              {!step.completed && !step.active ? [] : []}
              <Step.Content>
                <Step.Title>{step.title}</Step.Title>
                <Step.Description>
                  {step.active ? step.subtitle : ""}
                </Step.Description>
              </Step.Content>
            </Step>
          );
        })
      : []}
  </Step.Group>
);

export default Stepper;
