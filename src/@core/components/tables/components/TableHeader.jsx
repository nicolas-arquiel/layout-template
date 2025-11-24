import React from 'react';
import { Flex, Heading, Box } from '@radix-ui/themes';

const TableHeader = ({
  title,
  titleComponent,
  titleIcon: TitleIcon,
  iconThemeClass = ""
}) => {
  if (!title && !titleComponent) return null;

  const TitleTag = titleComponent || "h4";

  return (
    <Flex
      p="4"
      align="center"
      style={{
        borderBottom: '1px solid var(--gray-5)',
      }}
    >
      {titleComponent ? (
        <TitleTag>{titleComponent}</TitleTag>
      ) : (
        <Flex align="center" gap="3">
          {TitleIcon && (
            <Box
              className={`avatar m-0 ${iconThemeClass}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-2)',
                backgroundColor: 'var(--accent-3)',
              }}
            >
              <TitleIcon size={21} />
            </Box>
          )}
          <Heading size="6" weight="medium">
            {title}
          </Heading>
        </Flex>
      )}
    </Flex>
  );
};

export default TableHeader;
