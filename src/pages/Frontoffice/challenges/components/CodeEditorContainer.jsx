/**
 * CodeEditorContainer – placeholder container for MonacoEditor.
 *
 * Currently renders a styled <textarea> with line numbers.
 * The component is designed so MonacoEditor can be swapped in
 * with minimal changes — just replace the inner content and
 * keep the same props interface.
 *
 * Props:
 *   code         – string
 *   setCode      – (string) => void
 *   language     – string
 *   setLanguage  – (string) => void
 */
import React, { useRef, useEffect, useMemo } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';

const CodeEditorContainer = ({ code, setCode, language }) => {
    const textareaRef = useRef(null);
    const lineNumbersRef = useRef(null);

    const lines = useMemo(() => code.split('\n'), [code]);
    const lineCount = lines.length;

    // Sync scroll between line numbers and textarea
    const handleScroll = () => {
        if (lineNumbersRef.current && textareaRef.current) {
            lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
        }
    };

    // Handle tab key inside textarea
    const handleKeyDown = (e) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            const start = e.target.selectionStart;
            const end = e.target.selectionEnd;
            const newCode = code.substring(0, start) + '  ' + code.substring(end);
            setCode(newCode);
            // Restore cursor position after React re-render
            requestAnimationFrame(() => {
                if (textareaRef.current) {
                    textareaRef.current.selectionStart = start + 2;
                    textareaRef.current.selectionEnd = start + 2;
                }
            });
        }
    };

    return (
        <Box
            flex={1}
            bg="#1a1a1a"
            overflow="hidden"
            position="relative"
        /**
         * MONACO INTEGRATION POINT:
         * Replace the Flex below with:
         *   <MonacoEditor
         *     language={language}
         *     value={code}
         *     onChange={setCode}
         *     theme="vs-dark"
         *     options={{ minimap: { enabled: false }, fontSize: 14 }}
         *   />
         */
        >
            <Flex h="100%" overflow="hidden">
                {/* Line numbers */}
                <Box
                    ref={lineNumbersRef}
                    fontFamily="'Courier New', monospace"
                    fontSize="sm"
                    lineHeight="1.7"
                    color="#858585"
                    userSelect="none"
                    pr={3}
                    pl={4}
                    pt={4}
                    borderRight="1px solid"
                    borderColor="#333"
                    mr={0}
                    overflowY="hidden"
                    flexShrink={0}
                    textAlign="right"
                    minW="48px"
                >
                    {Array.from({ length: lineCount }, (_, i) => (
                        <Text key={i} h="1.7em">{i + 1}</Text>
                    ))}
                </Box>

                {/* Code textarea */}
                <Box
                    as="textarea"
                    ref={textareaRef}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    onScroll={handleScroll}
                    onKeyDown={handleKeyDown}
                    spellCheck={false}
                    fontFamily="'Courier New', monospace"
                    fontSize="sm"
                    lineHeight="1.7"
                    color="#d4d4d4"
                    bg="transparent"
                    border="none"
                    outline="none"
                    resize="none"
                    w="100%"
                    h="100%"
                    p={4}
                    pl={3}
                    overflowY="auto"
                    whiteSpace="pre"
                    _focus={{ boxShadow: 'none' }}
                    sx={{
                        '&::-webkit-scrollbar': { width: '8px' },
                        '&::-webkit-scrollbar-track': { bg: '#1a1a1a' },
                        '&::-webkit-scrollbar-thumb': { bg: '#333', borderRadius: '4px' },
                    }}
                />
            </Flex>
        </Box>
    );
};

export default CodeEditorContainer;
