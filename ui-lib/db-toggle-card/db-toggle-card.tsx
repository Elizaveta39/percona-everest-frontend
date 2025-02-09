import React from 'react';
import { ToggleCard } from '@percona/ui-lib.toggle-card';
import { PostgreSqlIcon, MongoIcon, MySqlIcon } from '@percona/ui-lib.icons.db';
import { SvgIconProps, Typography } from '@mui/material';
import { DbToggleCardProps, DbType } from './db-toggle-card.types';
import { humanizeDbType } from './db-toggle-card.utils';

const iconMap: Record<DbType, (props: SvgIconProps) => React.JSX.Element> = {
  [DbType.Postresql]: PostgreSqlIcon,
  [DbType.Mongo]: MongoIcon,
  [DbType.Mysql]: MySqlIcon,
};

const DbIcon = ({ type }: { type: DbType }) => {
  const commonProps: SvgIconProps = {
    fontSize: 'large',
    sx: { mr: 1 },
  };

  const MappedIcon = iconMap[type];

  return <MappedIcon {...commonProps} />;
};

export const DbToggleCard = (props: DbToggleCardProps) => {
  const { value } = props;

  return (
    <ToggleCard {...props} data-testid={`${value}-toggle-button`}>
      <DbIcon type={value} />
      <Typography variant="body1">{humanizeDbType(value)}</Typography>
    </ToggleCard>
  );
};
