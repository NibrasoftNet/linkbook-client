import type { UserConfig } from '@commitlint/types';
// eslint-disable-next-line import/no-extraneous-dependencies
import { RuleConfigSeverity } from '@commitlint/types';

const Configuration: UserConfig = {
  rules: {
    'body-leading-blank': [RuleConfigSeverity.Warning, 'always'] as const,
  },
};

export default Configuration;
