import React, { useState } from "react";
import { Box, Container, Tab, Tabs, tabsClasses } from "@mui/material";
import JetIcon from "../common/JetIcon";



const JetOptionsTab: React.FC<{}> = () => {
    const [tab, setTab] = useState(0);

    const handleChange = (event: React.SyntheticEvent<Element, Event>, newTab: number) => {
        setTab(newTab);
    }

    return(
        <Container maxWidth="xl">
            <Box
                sx={{
                    display: 'flex',
                    flexGrow: 1,
                    px: {xs:0, md:2},
                    alignItems: 'center',
                    mt:2,
                    mb:2
                }}
            >
                <Tabs 
                    value={tab} 
                    onChange={handleChange} 
                    variant="scrollable" 
                    scrollButtons
                    sx={{
                        [`& .${tabsClasses.scrollButtons}`]: {
                            '&.Mui-disabled': {opacity: 0.3},
                        }
                    }}
                >
                    <Tab key={1} icon={<JetIcon icon={'jet-beef'}/>} label="Мясо"></Tab>
                    <Tab key={2} icon={<JetIcon icon={'jet-fish'}/>} label="Рыба"></Tab>
                    <Tab key={3} icon={<JetIcon icon={'jet-egg'}/>} label="Яйца"></Tab>
                    <Tab key={4} icon={<JetIcon icon={'jet-fruit'}/>} label="Свежие фрукты"></Tab>

                    <Tab key={5} icon={<JetIcon icon={'jet-beef'}/>} label="Мясо"></Tab>
                    <Tab key={6} icon={<JetIcon icon={'jet-fish'}/>} label="Рыба"></Tab>
                    <Tab key={7} icon={<JetIcon icon={'jet-egg'}/>} label="Яйца"></Tab>
                    <Tab key={8} icon={<JetIcon icon={'jet-fruit'}/>} label="Свежие фрукты"></Tab>

                    <Tab key={9} icon={<JetIcon icon={'jet-beef'}/>} label="Мясо"></Tab>
                    <Tab key={10} icon={<JetIcon icon={'jet-fish'}/>} label="Рыба"></Tab>
                    <Tab key={11} icon={<JetIcon icon={'jet-egg'}/>} label="Яйца"></Tab>
                    <Tab key={12} icon={<JetIcon icon={'jet-fruit'}/>} label="Свежие фрукты"></Tab>

                    <Tab key={13} icon={<JetIcon icon={'jet-beef'}/>} label="Мясо"></Tab>
                    <Tab key={14} icon={<JetIcon icon={'jet-fish'}/>} label="Рыба"></Tab>
                    <Tab key={15} icon={<JetIcon icon={'jet-egg'}/>} label="Яйца"></Tab>
                    <Tab key={16} icon={<JetIcon icon={'jet-fruit'}/>} label="Свежие фрукты"></Tab>
                </Tabs>
            </Box>
        </Container>
    );   
}

export default JetOptionsTab;