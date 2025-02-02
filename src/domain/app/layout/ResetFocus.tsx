import React from 'react';
import { matchPath, RouteProps, useLocation } from 'react-router';

import useLocale from '../../../hooks/useLocale';

/**
 * Ensure that browser focus is set to body when navigating using
 * <Link> from react-router-dom.
 */
interface IgnorePathProps {
  pathname: string;
  props?: RouteProps;
}
interface Props {
  disabled?: boolean;
  ignoredPaths: IgnorePathProps[];
}
const ResetFocus: React.FC<Props> = ({ disabled, ignoredPaths }) => {
  const locale = useLocale();
  const { pathname } = useLocation();
  const node = React.useRef<HTMLDivElement>(null);

  const isMatch = React.useCallback(
    (paths: IgnorePathProps[]) =>
      paths.some((path) =>
        matchPath(pathname, {
          path: `/${locale}${path.pathname}`,
          exact: path.props?.exact ?? /* istanbul ignore next */ true,
          strict: path.props?.strict ?? true,
        })
      ),
    [locale, pathname]
  );

  React.useEffect(() => {
    if (!disabled && !isMatch(ignoredPaths)) {
      node.current?.focus();
    }
  }, [disabled, ignoredPaths, isMatch]);

  return <div ref={node} tabIndex={-1}></div>;
};

export default ResetFocus;
