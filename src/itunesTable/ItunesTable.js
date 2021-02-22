import {
    Button,
    Flex,
    Image,
    Table,
    TableCaption,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react';
import {
    ArrowUpDownIcon,
    ChevronUpIcon,
    ChevronDownIcon,
} from '@chakra-ui/icons';
import { DescriptionModal } from '../descriptionModal';
import { useState } from 'react';

function sortTable(sortSettings, results) {
    if (sortSettings) {
        console.log('sorting ...');
        const { sortedField, sortDirection } = sortSettings;
        const direction = sortDirection === 'asc' ? 1 : -1;
        console.log(direction);
        const sortedTable = results.sort((a, b) => {
            if (a[sortedField] < b[sortedField]) return -1 * direction;
            else if (a[sortedField] > b[sortedField]) return 1 * direction;
            else return 0;
        });
        console.log(sortedTable);
        return sortedTable;
    } else {
        return [...results];
    }
}

export function ItunesTable({ results }) {
    const [sortSettings, setSortSettings] = useState(null);

    return (
        <Table variant="simple">
            <TableCaption>iTunes Ebooks</TableCaption>
            <Thead>
                <Tr>
                    <Th>Artwork</Th>
                    <Th>
                        <Flex align="center">
                            Name
                            <Flex direction="column">
                                <Button
                                    onClick={() => {
                                        setSortSettings({
                                            sortedField: 'trackName',
                                            sortDirection: 'asc',
                                        });
                                    }}
                                    colorScheme="whiteAlpha"
                                    variant="link"
                                >
                                    <ChevronUpIcon />
                                </Button>
                                <Button
                                    onClick={() => {
                                        setSortSettings({
                                            sortedField: 'trackName',
                                            sortDirection: 'desc',
                                        });
                                    }}
                                    colorScheme="whiteAlpha"
                                    variant="link"
                                >
                                    <ChevronDownIcon />
                                </Button>
                            </Flex>
                        </Flex>
                    </Th>
                    <Th isNumeric>
                        <Flex align="center">
                            Price
                            <Flex direction="column">
                                <Button
                                    onClick={() => {
                                        setSortSettings({
                                            sortedField: 'price',
                                            sortDirection: 'asc',
                                        });
                                    }}
                                    colorScheme="whiteAlpha"
                                    variant="link"
                                >
                                    <ChevronUpIcon />
                                </Button>
                                <Button
                                    onClick={() => {
                                        setSortSettings({
                                            sortedField: 'price',
                                            sortDirection: 'desc',
                                        });
                                    }}
                                    colorScheme="whiteAlpha"
                                    variant="link"
                                >
                                    <ChevronDownIcon />
                                </Button>
                            </Flex>
                        </Flex>
                    </Th>
                    <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
                {sortTable(sortSettings, results).map((result) => (
                    <Tr key={result.trackId}>
                        <Td>
                            <Image src={result.artworkUrl60} />
                        </Td>
                        <Td>{result.trackName}</Td>
                        <Td isNumeric>
                            {!result.formattedPrice
                                ? 'unknown'
                                : result.formattedPrice}
                        </Td>
                        <Td>
                            <DescriptionModal result={result} />
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
}
