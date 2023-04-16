import {Modal, ModalHeader, ModalProps} from "@/components/construction/Modal/Modal";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";

export default function HelpModal(props: ModalProps) {
    return (
        <Modal opened={props.opened} onClose={props.onClose}>
            <ModalHeader>Pomoc</ModalHeader>
            <Tabs>
                <TabList>
                    <Tab>Jednostki</Tab>
                </TabList>

                <TabPanel>
                    <table>
                        <thead>
                        <tr>
                            <th>Jednostka</th>
                            <th>opis</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>cm</td>
                            <td>centymetry</td>
                        </tr>
                        <tr>
                            <td>mm</td>
                            <td>milimetry</td>
                        </tr>
                        <tr>
                            <td>in</td>
                            <td>cale (1in = 96px = 2.54cm)</td>
                        </tr>
                        <tr>
                            <td>px</td>
                            <td>piksele (1px = 1/96th of 1in)</td>
                        </tr>
                        <tr>
                            <td>pt</td>
                            <td>punkty (1pt = 1/72 of 1in)</td>
                        </tr>
                        <tr>
                            <td>pc</td>
                            <td>piki (1pc = 12 pt)</td>
                        </tr>
                        <tr>
                            <td>em</td>
                            <td>względnie do rozmiaru czcionki elementu (2em oznacza 2 razy większy rozmiar bieżącej
                                czcionki)
                            </td>
                        </tr>
                        <tr>
                            <td>rem</td>
                            <td>względnie do rozmiaru czcionki elementu głównego strony</td>
                        </tr>
                        <tr>
                            <td>vw</td>
                            <td>% szerokości okna przeglądarki</td>
                        </tr>
                        <tr>
                            <td>vh</td>
                            <td>% wysokości okna przeglądarki</td>
                        </tr>
                        <tr>
                            <td>vmin</td>
                            <td>% mniejszego wymiaru okna przeglądarki</td>
                        </tr>
                        <tr>
                            <td>vmax</td>
                            <td>% większego wymiaru okna przeglądarki</td>
                        </tr>
                        <tr>
                            <td>%</td>
                            <td>% względnie wymiarów rodzica</td>
                        </tr>
                        </tbody>
                    </table>
                </TabPanel>
            </Tabs>
        </Modal>
    );

}
