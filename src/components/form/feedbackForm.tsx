import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from '@mantine/core';
import { TextInput, Checkbox, Text, Button, Grid, Group, Box, Input, Textarea, Space, Radio, Select, MultiSelect } from '@mantine/core';
import { Center } from '@mantine/core';
import MantineRating from './rating';
import { Avatar, Indicator } from '@mantine/core';
import { type } from 'os';
import { IMaskInput } from 'react-imask';

type FeedBackFormProps = {
    storeId: string;
};

interface Question {
    id: string,
    question: string,
    required: boolean,
    type: string,
    values?: string[]
    options?: any[]
    maskValue? : string,
    labelColor?:string,
    labelFontSize?: string,
    ans? : string | string[] | boolean
}

interface ShopQ {
    shopId?: string,
    labelColor?: string,
    labelFontSize?: string,
    questions?: Question[],
}

const FeedBackForm: React.FC<FeedBackFormProps> = ({ }) => {
    const [shopData, setShopData] = useState<ShopQ>({});
    const [value, setValue] = useState('react');
    useEffect(() => {
        axios.get("url").then(response => {
            // need to write
        }).catch(err => {
            setShopData({

                shopId: '1',
                labelColor: 'blue',
                labelFontSize: '400',
                questions: [
                    {
                        id: '1',
                        question: "Food Quality",
                        required: true,
                        type: 'rating',
                        labelColor: 'blue',
                        labelFontSize: '400'
                    },
                    {
                        id: '2',
                        question: "Overall Service Quality",
                        required: true,
                        type: 'rating'
                    },
                    {
                        id: '3',
                        question: "Overall Experience",
                        required: true,
                        type: 'rating'
                    },
                    {
                        id: '4',
                        question: "Name",
                        required: false,
                        type: 'text',
                    },
                    {
                        id: '5',
                        question: "email",
                        required: false,
                        type: 'email',
                    },
                    {
                        id: '6',
                        question: "Mobile Number",
                        required: false,
                        type: 'maskinput',
                        maskValue : '+91 00000000'
                    },
                    {
                        id: '7',
                        question: "Stores Avaliable Accross",
                        required: true,
                        type: 'radio',
                        values: ['Kolkata', 'Paris', 'Landon']
                    },
                    {
                        id: '8',
                        question: "Stores Avaliable Accross",
                        required: true,
                        type: 'select',
                        options: [{ value: 'Kolkata', label: 'Kolkata' }, { value: 'Paris', label: 'Paris' }, { value: 'Landon', label: 'Landon' }]
                    },
                    {
                        id: '9',
                        question: "Stores Avaliable Accross",
                        required: true,
                        type: 'mulselect',
                        options: [{ value: 'Kolkata', label: 'Kolkata' }, { value: 'Paris', label: 'Paris' }, { value: 'Landon', label: 'Landon' }]
                    },
                    {
                        id: '10',
                        question: "Any comments, questions or suggestions?",
                        required: true,
                        type: 'textarea',
                    }


                ]

            })
        })

    }, [])

    if (!shopData?.shopId) {
        return <></>
    }

    const updateAns = (id:string, value: string| boolean| string[]) => {
        if(!shopData.questions || shopData?.questions.length === 0)
        return;
        let questionAns = [...shopData.questions];
        const updatedArray = questionAns.map(obj => {
            if (obj.id === id) {
                obj.ans = value;
            }
            return obj;
         });
        console.log(updatedArray);
    }

    return (
        <Container size="xs" px="xs"
        >
            <Grid>
                <Grid.Col span={12} ><Space h="lg" />
                    <Center maw={400} h={100} mx="auto">
                        <Avatar size="6.5rem" radius="xl" src="https://cdn.logojoy.com/wp-content/uploads/2018/05/30151550/1317.png" />
                    </Center><Space h="lg" /></Grid.Col>
                <Grid.Col span={12} >{shopData && shopData?.questions &&
                    shopData?.questions.map(qObj => (
                        <>
                            <Text fz="xl" fw={500} variant="gradient"
                                gradient={{ from: 'indigo', to: 'cyan', deg: 45 }} component="label">{qObj.question}</Text>
                            
                            {qObj.type === 'text' && <Input
                                placeholder={qObj.question}
                                mask={qObj.maskValue}
                                component={IMaskInput}
                                onChange={(event) => updateAns(qObj.id,event.currentTarget.value)}
                            />}
                            {qObj.type === 'email' && <Input
                                placeholder={qObj.question}
                                onChange={(event) => updateAns(qObj.id,event.currentTarget.value)}
                                
                            />}
                            {qObj.type === 'rating' && <MantineRating getRatingValue={updateAns} id={qObj.id}/>}

                            {qObj.type === 'textarea' && <Textarea
                                placeholder="Your comment"
                                withAsterisk
                            />}
                            {qObj.type === 'radio' &&
                                <Radio.Group
                                    value={value}
                                    onChange={setValue}
                                    name="favoriteFramework"
                                    withAsterisk
                                >
                                    {qObj?.values && qObj?.values.map(r => (<Radio value={r} label={r} color="red" h={30} />))}

                                </Radio.Group>
                            }
                            
                            {qObj.type === 'maskinput' && <Input
                                placeholder="Your comment"
                                mask={qObj.maskValue}
                                component={IMaskInput}
                            />}

                            {qObj.type === 'select' && qObj?.options && <Select data={qObj?.options} value={'Kolkata'} />}


                            {qObj.type === 'mulselect' && qObj?.options && <MultiSelect data={qObj?.options}
                                label="Your favorite frameworks/libraries"
                                placeholder="Pick all that you like"
                                searchable
                                //   searchValue={searchValue}
                                //   onSearchChange={onSearchChange}
                                nothingFound="Nothing found" />}
                            <Space h="lg" />
                        </>
                    ))

                }</Grid.Col>
                <Grid.Col span={12}> <Space h="lg" />
                <Button variant="gradient" gradient={{ from: 'teal', to: 'lime', deg: 105 }} size="lg" fullWidth>Submit</Button></Grid.Col>
            </Grid>









        </Container>

    );
};

export default FeedBackForm;
