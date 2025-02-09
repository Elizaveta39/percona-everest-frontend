import { ThemeContextProvider } from '@percona/design.theme-context-provider';
import { everestThemeOptions } from '@percona/design.themes.everest';
import { render, screen } from '@testing-library/react';
import React, { useState } from 'react';
import { ResourcesDetail } from './resources-detail';

const ResourcesDetailWrapper = () => {
  const [inputValue, setInputValue] = useState<number>(0);
  return (
    <ThemeContextProvider themeOptions={everestThemeOptions}>
      <ResourcesDetail
        inputProps={{
          dataTestId: 'cpu',
          setValue: setInputValue,
          value: inputValue,
          units: 'CPU',
        }}
        value={1}
        total={10}
        label="CPU"
        labelProgressBar="Using 112.52 CPU (16.7%) of 675.33 CPU in total"
      />
    </ThemeContextProvider>
  );
};

it('should render with the correct text', () => {
  render(<ResourcesDetailWrapper />);
  expect(
    screen.getByText('Using 112.52 CPU (16.7%) of 675.33 CPU in total')
  ).toBeInTheDocument();
});
