import React, { useEffect, useState } from "react";
import { Box, Container, Tab, Tabs, tabsClasses } from "@mui/material";
import JetIcon from "../common/JetIcon";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import * as catalogSelectors from '../../store/selectors/catalogSelectors';
import { getCategories } from "../../store/slices/catalogSlice";
import { IGetCategory } from "../../models/catalog";
import { getIcon } from "../../utils/utils";

interface OptionsTab {
    onChangeTab?: (tabId: string) => void;
}


const JetOptionsTab: React.FC<OptionsTab> = ({onChangeTab}) => {
    const dispatch = useAppDispatch();
    const productCategories = useAppSelector(catalogSelectors.productCategories);
    const [tab, setTab] = useState<number>(0);
    let [categoryOpts, setCategoryOpts] = useState<IGetCategory>({ name: '', orderBy: 'asc', pageIndex: 0, pageSize: 10 });

    const handleChange = (event: React.SyntheticEvent<Element, Event>, newTab: number) => {
        setTab(newTab);
        let tabId = null;

        if(!!productCategories && newTab != 0) {
            tabId = productCategories[newTab - 1].id;
        } else if(!!productCategories && newTab == 0) {
            tabId = 'all';
        }

        if(!!tabId && onChangeTab) {
            onChangeTab(tabId);
        }
        
    }

    

    useEffect(() => {
        const getCategoriesList = async () => {
            if (!(!!productCategories)) {
                await dispatch(getCategories(categoryOpts));
            }
        }

        getCategoriesList();
    }, [])

    return (
        <Container maxWidth="xl">
            <Box
                sx={{
                    display: 'flex',
                    flexGrow: 1,
                    px: { xs: 0, md: 2 },
                    alignItems: 'center',
                    justifyContent: 'center',
                    mt: 2,
                    mb: 2
                }}
            >
                <Tabs
                    value={tab}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons
                    sx={{
                        [`& .${tabsClasses.scrollButtons}`]: {
                            '&.Mui-disabled': { opacity: 0.3 },
                        }
                    }}
                >
                    <Tab key={0} icon={<JetIcon icon={'jet-all-products'} />} label="Все"></Tab>
                    {!!productCategories &&
                        productCategories?.map((category, index) => {
                            return (
                                <Tab key={index + 1} icon={<JetIcon icon={getIcon(category.name)} />} label={category.name}></Tab>
                            );
                        })
                    }

                </Tabs>
            </Box>
        </Container>
    );
}

export default JetOptionsTab;