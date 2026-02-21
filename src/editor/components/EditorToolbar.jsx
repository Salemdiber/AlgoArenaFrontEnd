/**
 * EditorToolbar – top bar above the code editor.
 *
 * Renders: language selector, reset button, run button.
 *
 * Props:
 *   language, setLanguage, isRunning, onRun, onReset, languages (optional)
 */
import React from 'react';
import { Flex, IconButton, Icon, Tooltip } from '@chakra-ui/react';
import LanguageSelector from './LanguageSelector';
import RunButton from './RunButton';

const ResetIcon = (props) => (
    <Icon viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polyline points="1 4 1 10 7 10" />
        <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
    </Icon>
);

const EditorToolbar = ({
    language,
    setLanguage,
    isRunning,
    onRun,
    onReset,
    languages,
}) => (
    <Flex
        bg="#1e293b"
        borderBottom="1px solid"
        borderColor="#334155"
        px={4}
        py={2}
        align="center"
        justify="space-between"
        gap={3}
        borderTopRadius="12px"
        flexShrink={0}
    >
        <LanguageSelector
            language={language}
            setLanguage={setLanguage}
            languages={languages}
        />

        <Flex gap={2} align="center">
            <Tooltip label="Reset code" placement="bottom" bg="#1e293b" color="gray.200" fontSize="xs">
                <IconButton
                    icon={<ResetIcon w={4} h={4} />}
                    variant="ghost"
                    color="gray.400"
                    _hover={{ color: 'gray.100', bg: '#334155' }}
                    size="sm"
                    aria-label="Reset code"
                    onClick={onReset}
                    borderRadius="8px"
                />
            </Tooltip>

            <RunButton isRunning={isRunning} onClick={onRun} />
        </Flex>
    </Flex>
);

export default EditorToolbar;
