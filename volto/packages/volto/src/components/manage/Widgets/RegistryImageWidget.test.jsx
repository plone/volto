import React from 'react';
import { Provider } from 'react-intl-redux';
import { render, waitFor } from '@testing-library/react';
import configureStore from 'redux-mock-store';

import RegistryImageWidget from './RegistryImageWidget';

import config from '@plone/volto/registry';

jest.spyOn(global.Date, 'now').mockImplementation(() => '0');

const mockStore = configureStore();

beforeAll(() => {
  config.settings.publicURL = 'http://localhost:3000';
});

describe('RegistryImageWidget', () => {
  test('renders an empty file widget component', async () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });

    const { container } = render(
      <Provider store={store}>
        <RegistryImageWidget
          id="my-field"
          title="My field"
          fieldSet="default"
          onChange={() => {}}
        />
      </Provider>,
    );

    await waitFor(() => {});
    expect(container).toMatchSnapshot();
  });
  test('renders a file widget component with value', async () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });

    const { container } = render(
      <Provider store={store}>
        <RegistryImageWidget
          id="my-field"
          title="My field"
          fieldSet="default"
          onChange={() => {}}
          value={
            'filenameb64:bG9nby5jYWI5NDVkOC5zdmc=;datab64:PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE1OC4yNTNweCIgaGVpZ2h0PSI0MC42ODZweCIgdmlld0JveD0iMCAwIDE1OC4yNTMgNDAuNjg2IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAxNTguMjUzIDQwLjY4NiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiAgICAgICAgICAgICAgICAgICAgPGc+PHBhdGggZmlsbD0iIzAwODZDMyIgZD0iTTY1LjMyNywyMy4yMDhoLTYuNTg5djExLjM4OGgtNC4zOTNWNS42MzhoMTAuOTgxYzUuNjUzLDAsOS4yNzEsMy43NDIsOS4yNzEsOC43ODUgICAgICAgICAgICAgICAgIFM3MC45NzksMjMuMjA4LDY1LjMyNywyMy4yMDh6IE02NS4wODIsOS41ODNoLTYuMzQ1djkuNjM5aDYuMzQ1YzMuMDUsMCw1LjEyNC0xLjc0OSw1LjEyNC00Ljc5OSAgICAgICAgICAgICAgICAgQzcwLjIwNiwxMS4zNzIsNjguMTMyLDkuNTgzLDY1LjA4Miw5LjU4M3oiLz48cGF0aCBmaWxsPSIjMDA4NkMzIiBkPSJNODMuOTY5LDM0LjU5NmMtMy45MDQsMC01LjY1Mi0yLjY0NC01LjY1Mi01LjY5M1Y1LjYzOGg0LjE0OHYyMy4wMjFjMCwxLjU4NywwLjU2NywyLjM5OSwyLjIzNSwyLjM5OWgxLjgzICAgICAgICAgICAgICAgICB2My41MzhIODMuOTY5eiIvPjxwYXRoIGZpbGw9IiMwMDg2QzMiIGQ9Ik0xMDQuNzYyLDMyLjM5OWMtMS4zNDQsMS4zODQtMy4zNzcsMi40NC02LjE4NCwyLjQ0Yy0yLjgwNSwwLTQuNzk5LTEuMDU4LTYuMTQxLTIuNDQgICAgICAgICAgICAgICAgIGMtMS45NTEtMi4wMzItMi40MzktNC42MzctMi40MzktOC4xMzRjMC0zLjQ1NywwLjQ4OC02LjA2MSwyLjQzOS04LjA5NGMxLjM0Mi0xLjM4MywzLjMzNi0yLjQ0LDYuMTQxLTIuNDQgICAgICAgICAgICAgICAgIGMyLjgwNywwLDQuODQsMS4wNTksNi4xODQsMi40NGMxLjk1MSwyLjAzMywyLjQzOSw0LjYzNywyLjQzOSw4LjA5NEMxMDcuMjAzLDI3Ljc2MywxMDYuNzEzLDMwLjM2NiwxMDQuNzYyLDMyLjM5OXogICAgICAgICAgICAgICAgICBNMTAxLjYyOSwxOC42MTNjLTAuNzczLTAuNzczLTEuODMtMS4xODEtMy4wNTEtMS4xODFjLTEuMjE5LDAtMi4yMzYsMC40MDYtMy4wMSwxLjE4MWMtMS4yNiwxLjI2MS0xLjQyMiwzLjQxNi0xLjQyMiw1LjY1MiAgICAgICAgICAgICAgICAgczAuMTYyLDQuMzkzLDEuNDIyLDUuNjUzYzAuNzczLDAuNzcxLDEuNzkxLDEuMjIsMy4wMSwxLjIyYzEuMjIxLDAsMi4yNzctMC40NDcsMy4wNTEtMS4yMmMxLjI2Mi0xLjI2MiwxLjQyNC0zLjQxNywxLjQyNC01LjY1MyAgICAgICAgICAgICAgICAgUzEwMi44OTEsMTkuODczLDEwMS42MjksMTguNjEzeiIvPjxwYXRoIGZpbGw9IiMwMDg2QzMiIGQ9Ik0xMjMuNjQzLDM0LjU5NlYyMi4wMjljMC0zLjIxNC0xLjgzLTQuNTk3LTQuMTQ3LTQuNTk3cy00LjI3MSwxLjQyMy00LjI3MSw0LjU5N3YxMi41NjZoLTQuMTQ3di0yMC42MiAgICAgICAgICAgICAgICAgaDQuMDY1djIuMDc0YzEuNDI1LTEuNTQ2LDMuNDE2LTIuMzE4LDUuNDktMi4zMThjMi4xMTUsMCwzLjg2NSwwLjY5MSw1LjA4NCwxLjg3MWMxLjU4NiwxLjU0NSwyLjA3NCwzLjQ5NywyLjA3NCw1LjgxNXYxMy4xNzggICAgICAgICAgICAgICAgIEwxMjMuNjQzLDM0LjU5NkwxMjMuNjQzLDM0LjU5NnoiLz48cGF0aCBmaWxsPSIjMDA4NkMzIiBkPSJNMTM1Ljc3MiwyNS40ODZjMCwzLjUzNywxLjg3MSw1Ljc3NCw1LjI0Niw1Ljc3NGMyLjMxNywwLDMuNTM5LTAuNjQ5LDUuMDA0LTIuMTE1bDIuNjQzLDIuNDgxICAgICAgICAgICAgICAgICBjLTIuMTE1LDIuMTE0LTQuMTA3LDMuMjEzLTcuNzI3LDMuMjEzYy01LjE2NiwwLTkuMjczLTIuNzI1LTkuMjczLTEwLjU3NGMwLTYuNjcxLDMuNDU3LTEwLjUzNCw4Ljc0NC0xMC41MzQgICAgICAgICAgICAgICAgIGM1LjUzMSwwLDguNzQ0LDQuMDY3LDguNzQ0LDkuOTI1djEuODNIMTM1Ljc3MnogTTE0NC40NzUsMTkuNzkxYy0wLjY1LTEuNTQ1LTIuMTEzLTIuNjA0LTQuMDY2LTIuNjA0ICAgICAgICAgICAgICAgICBjLTEuOTUxLDAtMy40NTcsMS4wNTktNC4xMDcsMi42MDRjLTAuNDA2LDAuOTM2LTAuNDg4LDEuNTQ2LTAuNTI5LDIuODA3aDkuMjczQzE0NS4wMDMsMjEuMzM3LDE0NC44ODMsMjAuNzI2LDE0NC40NzUsMTkuNzkxeiIvPjxjaXJjbGUgZmlsbD0iIzAwODZDMyIgY3g9IjE3LjgxNSIgY3k9IjExLjUxNiIgcj0iNC40MDIiLz48cGF0aCBmaWxsPSIjMDA4NkMzIiBkPSJNMzEuMTY3LDIwLjMxMWMwLDIuNDMzLTEuOTY5LDQuNDAxLTQuNDAzLDQuNDAxYy0yLjQyNywwLTQuNDAxLTEuOTctNC40MDEtNC40MDEgICAgICAgICAgICAgICAgIGMwLTIuNDMzLDEuOTc1LTQuNDAxLDQuNDAxLTQuNDAxQzI5LjIsMTUuOTA5LDMxLjE2NywxNy44NzksMzEuMTY3LDIwLjMxMXoiLz48Y2lyY2xlIGZpbGw9IiMwMDg2QzMiIGN4PSIxNy44MDEiIGN5PSIyOS4xMzEiIHI9IjQuNDAyIi8+PGc+PHBhdGggZmlsbD0iIzAwODZDMyIgZD0iTTIwLjQ0MS0wLjA0NUM5LjIwNy0wLjA0NCwwLjEsOS4wNjMsMC4wOTksMjAuMjk4QzAuMSwzMS41MzIsOS4yMDcsNDAuNjM5LDIwLjQ0MSw0MC42NDEgICAgICAgICAgICAgICAgICAgICBjMTEuMjM1LTAuMDAyLDIwLjM0MS05LjEwNywyMC4zNDMtMjAuMzQzQzQwLjc4Myw5LjA2MywzMS42NzctMC4wNDQsMjAuNDQxLTAuMDQ1eiBNMzEuODkxLDMxLjc0NyAgICAgICAgICAgICAgICAgICAgIGMtMi45MzcsMi45MzQtNi45NzIsNC43NDItMTEuNDUsNC43NDNjLTQuNDc4LTAuMDAxLTguNTEzLTEuODExLTExLjQ1LTQuNzQzQzYuMDU4LDI4LjgxLDQuMjUsMjQuNzc1LDQuMjQ5LDIwLjI5OCAgICAgICAgICAgICAgICAgICAgIGMwLjAwMS00LjQ3OCwxLjgwOS04LjUxMyw0Ljc0My0xMS40NWMyLjkzNy0yLjkzNCw2Ljk3Mi00Ljc0MiwxMS40NS00Ljc0M2M0LjQ3OCwwLjAwMSw4LjUxMywxLjgxLDExLjQ1LDQuNzQzICAgICAgICAgICAgICAgICAgICAgYzIuOTM0LDIuOTM4LDQuNzQyLDYuOTczLDQuNzQzLDExLjQ1QzM2LjYzMywyNC43NzUsMzQuODI1LDI4LjgxLDMxLjg5MSwzMS43NDd6Ii8+PC9nPjxnPjxwYXRoIGZpbGw9IiMwMDg2QzMiIGQ9Ik0xNTMuOTg1LDkuOTVjLTEuMTk1LDAtMi4xNjQsMC45NzEtMi4xNjQsMi4xNjhjMC4wMDIsMS4xOTcsMC45NjksMi4xNjgsMi4xNjQsMi4xNjggICAgICAgICAgICAgICAgICAgICBjMS4xOTksMCwyLjE3Mi0wLjk3MSwyLjE3Mi0yLjE2OFMxNTUuMTg0LDkuOTUsMTUzLjk4NSw5Ljk1eiBNMTUzLjk4NSwxMy45NjhjLTEuMDIxLTAuMDAyLTEuODQ2LTAuODI3LTEuODQ2LTEuODUgICAgICAgICAgICAgICAgICAgICBjMC4wMDItMS4wMjEsMC44MjUtMS44NDksMS44NDYtMS44NTFjMS4wMjMsMC4wMDIsMS44NTIsMC44MjgsMS44NTQsMS44NTFDMTU1LjgzNiwxMy4xNDEsMTU1LjAwOCwxMy45NjYsMTUzLjk4NSwxMy45Njh6Ii8+PC9nPjxnPjxwYXRoIGZpbGw9IiMwMDg2QzMiIGQ9Ik0xNTQuNTA3LDEzLjQwOWwtMC41NC0xLjA4aC0wLjQ4NnYxLjA4aC0wLjM4OXYtMi41NjRoMC45OTRjMC40ODQsMCwwLjc5NiwwLjMxMywwLjc5NiwwLjc1ICAgICAgICAgICAgICAgICAgICAgYzAsMC4zNjctMC4yMjQsMC42MDItMC41MTMsMC42OGwwLjU5MiwxLjEzNkwxNTQuNTA3LDEzLjQwOUwxNTQuNTA3LDEzLjQwOXogTTE1NC4wNTYsMTEuMTk1aC0wLjU3NXYwLjgwM2gwLjU3NSBjMC4yNjEsMCwwLjQzNy0wLjE0NywwLjQzNy0wLjM5OVMxNTQuMzE3LDExLjE5NSwxNTQuMDU2LDExLjE5NXoiLz48L2c+PC9nPgogICAgICAgICAgICAgICAgICA8L3N2Zz4=}'
          }
        />
      </Provider>,
    );

    await waitFor(() => {});
    expect(container).toMatchSnapshot();
  });
  // test('renders a file widget component with value in raw data', async () => {
  //   const store = mockStore({
  //     intl: {
  //       locale: 'en',
  //       messages: {},
  //     },
  //   });

  //   const { container } = render(
  //     <Provider store={store}>
  //       <RegistryImageWidget
  //         id="my-field"
  //         title="My field"
  //         fieldSet="default"
  //         onChange={() => {}}
  //         value={
  //           'filenameb64:bG9nby5jYWI5NDVkOC5zdmc=;datab64:PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE1OC4yNTNweCIgaGVpZ2h0PSI0MC42ODZweCIgdmlld0JveD0iMCAwIDE1OC4yNTMgNDAuNjg2IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAxNTguMjUzIDQwLjY4NiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiAgICAgICAgICAgICAgICAgICAgPGc+PHBhdGggZmlsbD0iIzAwODZDMyIgZD0iTTY1LjMyNywyMy4yMDhoLTYuNTg5djExLjM4OGgtNC4zOTNWNS42MzhoMTAuOTgxYzUuNjUzLDAsOS4yNzEsMy43NDIsOS4yNzEsOC43ODUgICAgICAgICAgICAgICAgIFM3MC45NzksMjMuMjA4LDY1LjMyNywyMy4yMDh6IE02NS4wODIsOS41ODNoLTYuMzQ1djkuNjM5aDYuMzQ1YzMuMDUsMCw1LjEyNC0xLjc0OSw1LjEyNC00Ljc5OSAgICAgICAgICAgICAgICAgQzcwLjIwNiwxMS4zNzIsNjguMTMyLDkuNTgzLDY1LjA4Miw5LjU4M3oiLz48cGF0aCBmaWxsPSIjMDA4NkMzIiBkPSJNODMuOTY5LDM0LjU5NmMtMy45MDQsMC01LjY1Mi0yLjY0NC01LjY1Mi01LjY5M1Y1LjYzOGg0LjE0OHYyMy4wMjFjMCwxLjU4NywwLjU2NywyLjM5OSwyLjIzNSwyLjM5OWgxLjgzICAgICAgICAgICAgICAgICB2My41MzhIODMuOTY5eiIvPjxwYXRoIGZpbGw9IiMwMDg2QzMiIGQ9Ik0xMDQuNzYyLDMyLjM5OWMtMS4zNDQsMS4zODQtMy4zNzcsMi40NC02LjE4NCwyLjQ0Yy0yLjgwNSwwLTQuNzk5LTEuMDU4LTYuMTQxLTIuNDQgICAgICAgICAgICAgICAgIGMtMS45NTEtMi4wMzItMi40MzktNC42MzctMi40MzktOC4xMzRjMC0zLjQ1NywwLjQ4OC02LjA2MSwyLjQzOS04LjA5NGMxLjM0Mi0xLjM4MywzLjMzNi0yLjQ0LDYuMTQxLTIuNDQgICAgICAgICAgICAgICAgIGMyLjgwNywwLDQuODQsMS4wNTksNi4xODQsMi40NGMxLjk1MSwyLjAzMywyLjQzOSw0LjYzNywyLjQzOSw4LjA5NEMxMDcuMjAzLDI3Ljc2MywxMDYuNzEzLDMwLjM2NiwxMDQuNzYyLDMyLjM5OXogICAgICAgICAgICAgICAgICBNMTAxLjYyOSwxOC42MTNjLTAuNzczLTAuNzczLTEuODMtMS4xODEtMy4wNTEtMS4xODFjLTEuMjE5LDAtMi4yMzYsMC40MDYtMy4wMSwxLjE4MWMtMS4yNiwxLjI2MS0xLjQyMiwzLjQxNi0xLjQyMiw1LjY1MiAgICAgICAgICAgICAgICAgczAuMTYyLDQuMzkzLDEuNDIyLDUuNjUzYzAuNzczLDAuNzcxLDEuNzkxLDEuMjIsMy4wMSwxLjIyYzEuMjIxLDAsMi4yNzctMC40NDcsMy4wNTEtMS4yMmMxLjI2Mi0xLjI2MiwxLjQyNC0zLjQxNywxLjQyNC01LjY1MyAgICAgICAgICAgICAgICAgUzEwMi44OTEsMTkuODczLDEwMS42MjksMTguNjEzeiIvPjxwYXRoIGZpbGw9IiMwMDg2QzMiIGQ9Ik0xMjMuNjQzLDM0LjU5NlYyMi4wMjljMC0zLjIxNC0xLjgzLTQuNTk3LTQuMTQ3LTQuNTk3cy00LjI3MSwxLjQyMy00LjI3MSw0LjU5N3YxMi41NjZoLTQuMTQ3di0yMC42MiAgICAgICAgICAgICAgICAgaDQuMDY1djIuMDc0YzEuNDI1LTEuNTQ2LDMuNDE2LTIuMzE4LDUuNDktMi4zMThjMi4xMTUsMCwzLjg2NSwwLjY5MSw1LjA4NCwxLjg3MWMxLjU4NiwxLjU0NSwyLjA3NCwzLjQ5NywyLjA3NCw1LjgxNXYxMy4xNzggICAgICAgICAgICAgICAgIEwxMjMuNjQzLDM0LjU5NkwxMjMuNjQzLDM0LjU5NnoiLz48cGF0aCBmaWxsPSIjMDA4NkMzIiBkPSJNMTM1Ljc3MiwyNS40ODZjMCwzLjUzNywxLjg3MSw1Ljc3NCw1LjI0Niw1Ljc3NGMyLjMxNywwLDMuNTM5LTAuNjQ5LDUuMDA0LTIuMTE1bDIuNjQzLDIuNDgxICAgICAgICAgICAgICAgICBjLTIuMTE1LDIuMTE0LTQuMTA3LDMuMjEzLTcuNzI3LDMuMjEzYy01LjE2NiwwLTkuMjczLTIuNzI1LTkuMjczLTEwLjU3NGMwLTYuNjcxLDMuNDU3LTEwLjUzNCw4Ljc0NC0xMC41MzQgICAgICAgICAgICAgICAgIGM1LjUzMSwwLDguNzQ0LDQuMDY3LDguNzQ0LDkuOTI1djEuODNIMTM1Ljc3MnogTTE0NC40NzUsMTkuNzkxYy0wLjY1LTEuNTQ1LTIuMTEzLTIuNjA0LTQuMDY2LTIuNjA0ICAgICAgICAgICAgICAgICBjLTEuOTUxLDAtMy40NTcsMS4wNTktNC4xMDcsMi42MDRjLTAuNDA2LDAuOTM2LTAuNDg4LDEuNTQ2LTAuNTI5LDIuODA3aDkuMjczQzE0NS4wMDMsMjEuMzM3LDE0NC44ODMsMjAuNzI2LDE0NC40NzUsMTkuNzkxeiIvPjxjaXJjbGUgZmlsbD0iIzAwODZDMyIgY3g9IjE3LjgxNSIgY3k9IjExLjUxNiIgcj0iNC40MDIiLz48cGF0aCBmaWxsPSIjMDA4NkMzIiBkPSJNMzEuMTY3LDIwLjMxMWMwLDIuNDMzLTEuOTY5LDQuNDAxLTQuNDAzLDQuNDAxYy0yLjQyNywwLTQuNDAxLTEuOTctNC40MDEtNC40MDEgICAgICAgICAgICAgICAgIGMwLTIuNDMzLDEuOTc1LTQuNDAxLDQuNDAxLTQuNDAxQzI5LjIsMTUuOTA5LDMxLjE2NywxNy44NzksMzEuMTY3LDIwLjMxMXoiLz48Y2lyY2xlIGZpbGw9IiMwMDg2QzMiIGN4PSIxNy44MDEiIGN5PSIyOS4xMzEiIHI9IjQuNDAyIi8+PGc+PHBhdGggZmlsbD0iIzAwODZDMyIgZD0iTTIwLjQ0MS0wLjA0NUM5LjIwNy0wLjA0NCwwLjEsOS4wNjMsMC4wOTksMjAuMjk4QzAuMSwzMS41MzIsOS4yMDcsNDAuNjM5LDIwLjQ0MSw0MC42NDEgICAgICAgICAgICAgICAgICAgICBjMTEuMjM1LTAuMDAyLDIwLjM0MS05LjEwNywyMC4zNDMtMjAuMzQzQzQwLjc4Myw5LjA2MywzMS42NzctMC4wNDQsMjAuNDQxLTAuMDQ1eiBNMzEuODkxLDMxLjc0NyAgICAgICAgICAgICAgICAgICAgIGMtMi45MzcsMi45MzQtNi45NzIsNC43NDItMTEuNDUsNC43NDNjLTQuNDc4LTAuMDAxLTguNTEzLTEuODExLTExLjQ1LTQuNzQzQzYuMDU4LDI4LjgxLDQuMjUsMjQuNzc1LDQuMjQ5LDIwLjI5OCAgICAgICAgICAgICAgICAgICAgIGMwLjAwMS00LjQ3OCwxLjgwOS04LjUxMyw0Ljc0My0xMS40NWMyLjkzNy0yLjkzNCw2Ljk3Mi00Ljc0MiwxMS40NS00Ljc0M2M0LjQ3OCwwLjAwMSw4LjUxMywxLjgxLDExLjQ1LDQuNzQzICAgICAgICAgICAgICAgICAgICAgYzIuOTM0LDIuOTM4LDQuNzQyLDYuOTczLDQuNzQzLDExLjQ1QzM2LjYzMywyNC43NzUsMzQuODI1LDI4LjgxLDMxLjg5MSwzMS43NDd6Ii8+PC9nPjxnPjxwYXRoIGZpbGw9IiMwMDg2QzMiIGQ9Ik0xNTMuOTg1LDkuOTVjLTEuMTk1LDAtMi4xNjQsMC45NzEtMi4xNjQsMi4xNjhjMC4wMDIsMS4xOTcsMC45NjksMi4xNjgsMi4xNjQsMi4xNjggICAgICAgICAgICAgICAgICAgICBjMS4xOTksMCwyLjE3Mi0wLjk3MSwyLjE3Mi0yLjE2OFMxNTUuMTg0LDkuOTUsMTUzLjk4NSw5Ljk1eiBNMTUzLjk4NSwxMy45NjhjLTEuMDIxLTAuMDAyLTEuODQ2LTAuODI3LTEuODQ2LTEuODUgICAgICAgICAgICAgICAgICAgICBjMC4wMDItMS4wMjEsMC44MjUtMS44NDksMS44NDYtMS44NTFjMS4wMjMsMC4wMDIsMS44NTIsMC44MjgsMS44NTQsMS44NTFDMTU1LjgzNiwxMy4xNDEsMTU1LjAwOCwxMy45NjYsMTUzLjk4NSwxMy45Njh6Ii8+PC9nPjxnPjxwYXRoIGZpbGw9IiMwMDg2QzMiIGQ9Ik0xNTQuNTA3LDEzLjQwOWwtMC41NC0xLjA4aC0wLjQ4NnYxLjA4aC0wLjM4OXYtMi41NjRoMC45OTRjMC40ODQsMCwwLjc5NiwwLjMxMywwLjc5NiwwLjc1ICAgICAgICAgICAgICAgICAgICAgYzAsMC4zNjctMC4yMjQsMC42MDItMC41MTMsMC42OGwwLjU5MiwxLjEzNkwxNTQuNTA3LDEzLjQwOUwxNTQuNTA3LDEzLjQwOXogTTE1NC4wNTYsMTEuMTk1aC0wLjU3NXYwLjgwM2gwLjU3NSBjMC4yNjEsMCwwLjQzNy0wLjE0NywwLjQzNy0wLjM5OVMxNTQuMzE3LDExLjE5NSwxNTQuMDU2LDExLjE5NXoiLz48L2c+PC9nPgogICAgICAgICAgICAgICAgICA8L3N2Zz4=}'
  //         }
  //       />
  //     </Provider>,
  //   );

  //   await waitFor(() => {});
  //   expect(container).toMatchSnapshot();
  // });
});
