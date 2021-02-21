import {
    Button,
    Flex,
    Heading,
    Link,
    Tag,
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Wrap,
    WrapItem,
} from '@chakra-ui/react';

export function DescriptionModal({ result }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Button onClick={onOpen} colorScheme="blue">
                Show More
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{result.trackName}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Heading mt={2} mb={2} size="md">
                            Author:
                        </Heading>
                        <Text>{result.artistName}</Text>
                        <Heading mt={2} mb={2} size="md">
                            Description:
                        </Heading>
                        <Text
                            dangerouslySetInnerHTML={{
                                __html: result.description,
                            }}
                        ></Text>
                        <Link
                            mt={3}
                            href={result.trackViewUrl}
                            color="blue"
                            mt={5}
                        >
                            Go to the store
                        </Link>
                        {result.genres ? (
                            <Wrap mt={2}>
                                {result.genres.map((genre, index) => (
                                    <WrapItem key={index}>
                                        <Tag size="md">{genre}</Tag>
                                    </WrapItem>
                                ))}
                            </Wrap>
                        ) : null}
                    </ModalBody>
                    <ModalFooter>
                        <Flex>
                            <Button colorScheme="blue" onClick={onClose}>
                                Close
                            </Button>
                        </Flex>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
