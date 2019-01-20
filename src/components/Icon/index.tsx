import React, { SFC } from 'react';

const requireAll = requireContext => requireContext.keys().map(requireContext);
const req = require.context('@assets/images/icons', false, /\.svg$/);
requireAll(req);

type Props = {
  cla: string;
  style?: string;
};

const Icon: SFC<Props> = ({ cla, style }) => (
  <svg className={`svg-icon ${cla} ${style}`} aria-hidden="true">
    <use xlinkHref={`#icon-${cla}`} />
  </svg>
);

export default Icon;
