import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { set } from 'date-fns';
import { id } from 'date-fns/locale';
import { connect } from 'http2';

const prisma = new PrismaClient();

const main = async () => {

        await prisma.playerMatches.deleteMany();
        await prisma.matches.deleteMany();
        await prisma.event.deleteMany();
        await prisma.admin.deleteMany();
        await prisma.player.deleteMany();
        await prisma.visitor.deleteMany();
        await prisma.user.deleteMany();
        await prisma.location.deleteMany();
        await prisma.sport.deleteMany();


    const sport1 = await prisma.sport.create({
        data: {
            name: 'Football',
            playerCount: 22
        }
    });

    const sport2 = await prisma.sport.create({
        data: {
            name: 'Basketball',
            playerCount: 10
        }
    });

    const sport3 = await prisma.sport.create({
        data: {
            name: 'Volleyball',
            playerCount: 12
        }
    });

    const sport4 = await prisma.sport.create({
        data: {
            name: 'Tennis',
            playerCount: 2
        }
    });

    const sport5 = await prisma.sport.create({
        data: {
            name: 'Table Tennis',
            playerCount: 2
        }
    });

    const location1 = await prisma.location.create({
        data: {
            city: 'Vilvoorde',
            cityCode: '1800',
            street: 'Vlaanderenstraat',
            number: '42'
        }
    });

    const location2 = await prisma.location.create({
        data: {
            city: 'Brussel',
            cityCode: '1000',
            street: 'Rue de la Loi',
            number: '16'
        }
    });

    const location3 = await prisma.location.create({
        data: {
            city: 'Antwerpen',
            cityCode: '2000',
            street: 'Meir',
            number: '1'
        }
    });

    const location4 = await prisma.location.create({
        data: {
            city: 'Gent',
            cityCode: '9000',
            street: 'Korenmarkt',
            number: '1'
        }
    });

    const location5 = await prisma.location.create({
        data: {
            city: 'Leuven',
            cityCode: '3000',
            street: 'Oude Markt',
            number: '1'
        }
    });

    const location6 = await prisma.location.create({
        data: {
            city: 'Mechelen',
            cityCode: '2800',
            street: 'Grote Markt',
            number: '1'
        }
    });

    const event1 = await prisma.event.create({
        data: {
            name: 'KickOff Mania',
            startDate: new Date(),
            endDate: new Date(),
            sport: {
                connect: {
                    id: sport1.id
                }
            },
            location: {
                connect: {
                    id: location1.id
                }
            }

        }
    });

    const event2 = await prisma.event.create({
        data: {
            name: 'Dunk Dynasty',
            startDate: new Date(),
            endDate: new Date(),
            sport: {
                connect: {
                    id: sport2.id
                }
            },
            location: {
                connect: {
                    id: location2.id
                }
            },
            
    }
    });

    const event3 = await prisma.event.create({
        data: {
            name: 'Serve & Smash Cup',
            startDate: new Date(),
            endDate: new Date(),
            sport: {
                connect: {
                    id: sport3.id
                }
            },
            location: {
                connect: {
                    id: location3.id
                }
            }
        }
    });

    const event4 = await prisma.event.create({
        data: {
            name: 'The Racket Rumble',
            startDate: new Date(),
            endDate: new Date(),
            sport: {
                connect: {
                    id: sport4.id
                }
            },
            location: {
                connect: {
                    id: location4.id
                }
            }
        }
    });

    const event5 = await prisma.event.create({
        data: {
            name: 'King of the Table',
            startDate: new Date(),
            endDate: new Date(),
            sport: {
                connect: {
                    id: sport5.id
                }
            },
            location: {
                connect: {
                    id: location5.id
                }
            }
        }
    });
    const matches1 = await prisma.matches.create({
        data: {
            date: new Date(),
            hour: '12:00',
            team1: 'SPY',
            team2: 'AZER',
            event: {
                connect: {
                    id: event1.id
                }
            }
        }
    });

    const matches2 = await prisma.matches.create({
        data: {
            date: new Date(),
            hour: '14:00',
            team1: 'NGX',
            team2: 'T1',
            event: {
                connect: {
                    id: event2.id
                }
            }
        }
    });

    const matches3 = await prisma.matches.create({
        data: {
            winner: 'T1',
            result: '3-0',
            date: new Date(),
            hour: '16:00',
            team1: 'T1',
            team2: 'G2',
            event: {
                connect: {
                    id: event3.id
                }
            }
        }
    });

    const user1 = await prisma.user.create({
        data: {
            fullName: 'John Doe',
            phoneNumber: '0487654321',
            email: 'johndoe@gmail.com',
            password: await bcrypt.hash('john', 10),
        }
    });

    const user2 = await prisma.user.create({
        data: {
            fullName: 'Jane Doe',
            phoneNumber: '0487654321',
            email: 'janedoe@gmail.com',
            password: await bcrypt.hash('jane', 10),
        }
    });

    const user3 = await prisma.user.create({
        data: {
            fullName: 'mikel jordan',
            phoneNumber: '0487654321',
            email: 'mikeljordan@gmail.com',
            password: await bcrypt.hash('baseball', 10),
        }
    });


    const admin = await prisma.admin.create({
        data: {
            user: { connect: { id: user1.id } },
            address: { connect: { id: location6.id } },
        },
    });

    const visitor = await prisma.visitor.create({
        data: {
            user:{connect: {id: user2.id}},
            address: { connect: { id: location6.id } },
        }
    })

    const vistorEvent1 = await prisma.visitorEvent.create({
        data: {
            visitor: { connect: {visitorId : visitor.visitorId} },
            event: { connect: { id: event1.id } }
        }
    });

    const vistorEvent2 = await prisma.visitorEvent.create({
        data: {
            visitor: { connect: {visitorId : visitor.visitorId} },
            event: { connect: { id: event2.id } }
        }
    });



    const user4 = await prisma.user.create({
        data: {
            fullName: 'Michael Jordan',
            phoneNumber: '0487654321',
            email: 'michaeljordon@gmail.com',
            password: await bcrypt.hash('michael', 10),
        }
    });

    const user5 = await prisma.user.create({
        data: {
            fullName: 'Kobe Bryant',
            phoneNumber: '0487654321',
            email: 'kobebryant@gmail.com',
            password: await bcrypt.hash('kobe', 10),
        }
    });

    const user6 = await prisma.user.create({
        data: {
            fullName: 'Lebron James',
            phoneNumber: '0487654321',
            email: 'lebronjames@gmail.com',
            password: await bcrypt.hash('lebron', 10),
        }
    });




    const player1 = await prisma.player.create({
        data: {
            user:{connect: {id: user3.id}},
            address: { connect: { id: location6.id } },
            age: 21,
            experience: 5,
            matches: {
                create: {
                    match: { connect: { id: matches1.id } }, 
                }
            },
            team: 'SPY'
        }
    })

    const player2 = await prisma.player.create({
        data: {
            user: { connect: { id: user4.id } },
            address: { connect: { id: location5.id } },
            age: 21,
            experience: 5,
            matches: {
                create: {
                    match: { connect: { id: matches1.id } }, 
                }
            },
            team: 'AZER'
        }
    });

    const player3 = await prisma.player.create({
        data: {
            user: { connect: { id: user5.id } },
            address: { connect: { id: location4.id } },
            age: 21,
            experience: 5,
            matches: {
                create: {
                    match: { connect: { id: matches1.id } }, 
                }
            },
            team: 'SPY'
        }
    });

    const player4 = await prisma.player.create({
        data: {
            user: { connect: { id: user6.id } },
            address: { connect: { id: location3.id } },
            age: 21,
            experience: 5,
            matches: {
                create: {
                    match: { connect: { id: matches1.id } }, 
                }
            },
            team: 'AZER'
        }
    });

    const user7 = await prisma.user.create({
        data: {
            fullName: 'Joe Doe',
            phoneNumber: '0487654321',
            email: 'joedoe@gmail.com',
            password: await bcrypt.hash('joe', 10),
        }
    });
    const player5 = await prisma.player.create({
        data: {
            user: { connect: { id: user7.id } },
            address: { connect: { id: location1.id } },
            age: 21,
            experience: 5,
            team: 'SKY'
        }
    });

    const user8 = await prisma.user.create({
        data: {
            fullName: 'Jack Doe',
            phoneNumber: '0487654321',
            email: 'jackdoe@gmail.com',
            password: await bcrypt.hash('jack', 10),
        }
    });

    const player6 = await prisma.player.create({
        data: {
            user: { connect: { id: user8.id } },
            address: { connect: { id: location2.id } },
            age: 21,
            experience: 5,
            team: 'SPY'
        }
    });

    
    const user11 = await prisma.user.create({
        data: {
            fullName: 'Emily Johnson',
            phoneNumber: '0498123456',
            email: 'emily.johnson@gmail.com',
            password: await bcrypt.hash('emily123', 10),
        }
    });
    
    const user12 = await prisma.user.create({
        data: {
            fullName: 'Liam Brown',
            phoneNumber: '0487651234',
            email: 'liam.brown@gmail.com',
            password: await bcrypt.hash('liamrocks', 10),
        }
    });
    
    const user13 = await prisma.user.create({
        data: {
            fullName: 'Sophia Davis',
            phoneNumber: '0478123456',
            email: 'sophia.davis@gmail.com',
            password: await bcrypt.hash('sophia123', 10),
        }
    });
    
    const user14 = await prisma.user.create({
        data: {
            fullName: 'Ethan Wilson',
            phoneNumber: '0467123456',
            email: 'ethan.wilson@gmail.com',
            password: await bcrypt.hash('ethanw123', 10),
        }
    });
    
    const user15 = await prisma.user.create({
        data: {
            fullName: 'Mia Garcia',
            phoneNumber: '0456123456',
            email: 'mia.garcia@gmail.com',
            password: await bcrypt.hash('miagarcia', 10),
        }
    });
    
    const user16 = await prisma.user.create({
        data: {
            fullName: 'James Anderson',
            phoneNumber: '0499123456',
            email: 'james.anderson@gmail.com',
            password: await bcrypt.hash('james1234', 10),
        }
    });
    
    const user17 = await prisma.user.create({
        data: {
            fullName: 'Ava Martinez',
            phoneNumber: '0491123456',
            email: 'ava.martinez@gmail.com',
            password: await bcrypt.hash('avarocks', 10),
        }
    });
    
    const user18 = await prisma.user.create({
        data: {
            fullName: 'Noah Thomas',
            phoneNumber: '0482123456',
            email: 'noah.thomas@gmail.com',
            password: await bcrypt.hash('noah1234', 10),
        }
    });
    
    const user19 = await prisma.user.create({
        data: {
            fullName: 'Isabella White',
            phoneNumber: '0479123456',
            email: 'isabella.white@gmail.com',
            password: await bcrypt.hash('isabella123', 10),
        }
    });
    
    const user20 = await prisma.user.create({
        data: {
            fullName: 'Oliver Harris',
            phoneNumber: '0465123456',
            email: 'oliver.harris@gmail.com',
            password: await bcrypt.hash('oliveriscool', 10),
        }
    });
    const user21 = await prisma.user.create({
        data: {
            fullName: 'Noaha Thomas',
            phoneNumber: '0482123456',
            email: 'noaha.thomas@gmail.com',
            password: await bcrypt.hash('noaha1234', 10),
        }
    });

    const location7 = await prisma.location.create({
        data: {
            city: 'Hasselt',
            cityCode: '3500',
            street: 'Kempische Steenweg',
            number: '70'
        }
    });
    
    const location8 = await prisma.location.create({
        data: {
            city: 'Brugge',
            cityCode: '8000',
            street: 'Markt',
            number: '5'
        }
    });
    
    const location9 = await prisma.location.create({
        data: {
            city: 'Oostende',
            cityCode: '8400',
            street: 'Albert I Promenade',
            number: '10'
        }
    });
    
    const location10 = await prisma.location.create({
        data: {
            city: 'Kortrijk',
            cityCode: '8500',
            street: 'Doorniksestraat',
            number: '2'
        }
    });
    
    const location11 = await prisma.location.create({
        data: {
            city: 'Sint-Niklaas',
            cityCode: '9100',
            street: 'Stationsstraat',
            number: '12'
        }
    });
    
    const location12 = await prisma.location.create({
        data: {
            city: 'Genk',
            cityCode: '3600',
            street: 'Stadsplein',
            number: '8'
        }
    });
    
    const location13 = await prisma.location.create({
        data: {
            city: 'Aalst',
            cityCode: '9300',
            street: 'Hopmarkt',
            number: '15'
        }
    });
    
    const location14 = await prisma.location.create({
        data: {
            city: 'Roeselare',
            cityCode: '8800',
            street: 'Ooststraat',
            number: '3'
        }
    });
    
    const location15 = await prisma.location.create({
        data: {
            city: 'Turnhout',
            cityCode: '2300',
            street: 'Warandestraat',
            number: '1'
        }
    });
    
    const location16 = await prisma.location.create({
        data: {
            city: 'Dendermonde',
            cityCode: '9200',
            street: 'Vlasmarkt',
            number: '20'
        }
    });
    const location17 = await prisma.location.create({
        data: {
            city: 'bagala',
            cityCode: '9200',
            street: 'Vlasmarkt',
            number: '20'
        }
    });

    const player7 = await prisma.player.create({
        data: {
            user: { connect: { id: user11.id } },
            address: { connect: { id: location7.id } },
            age: 29,
            experience: 3,
            team: 'NGX'
        }
    });
    
    const player8 = await prisma.player.create({
        data: {
            user: { connect: { id: user12.id } },
            address: { connect: { id: location8.id } },
            age: 25,
            experience: 5,
            team: 'T1'
        }
    });

    const player9 = await prisma.player.create({
        data: {
            user: { connect: { id: user13.id } },
            address: { connect: { id: location9.id } },
            age: 27,
            experience: 4,
            team: 'G2'
        }
    });

    const player10 = await prisma.player.create({
        data: {
            user: { connect: { id: user14.id } },
            address: { connect: { id: location10.id } },
            age: 23,
            experience: 2,
            team: 'T1'
        }
    });

    const player11 = await prisma.player.create({
        data: {
            user: { connect: { id: user15.id } },
            address: { connect: { id: location11.id } },
            age: 26,
            experience: 4,
            team: 'G2'
        }
    });

    const player12 = await prisma.player.create({
        data: {
            user: { connect: { id: user16.id } },
            address: { connect: { id: location12.id } },
            age: 28,
            experience: 3,
            team: 'T1'
        }
    });

    const player13 = await prisma.player.create({
        data: {
            user: { connect: { id: user17.id } },
            address: { connect: { id: location13.id } },
            age: 24,
            experience: 5,
            team: 'G2'
        }
    });

    const player14 = await prisma.player.create({
        data: {
            user: { connect: { id: user18.id } },
            address: { connect: { id: location14.id } },
            age: 30,
            experience: 2,
            team: 'T1'
        }
    });

    const player15 = await prisma.player.create({
        data: {
            user: { connect: { id: user19.id } },
            address: { connect: { id: location15.id } },
            age: 31,
            experience: 3,
            team: 'G2'
        }
    });

    const player16 = await prisma.player.create({
        data: {
            user: { connect: { id: user20.id } },
            address: { connect: { id: location16.id } },
            age: 29,
            experience: 4,
            team: 'T1'
        }
    });

    const player17 = await prisma.player.create({
        data: {
            user: { connect: { id: user21.id } },
            address: { connect: { id: location17.id } },
            age: 27,
            experience: 5,
            team: 'NGX'
        }
    });

};
(async () => {
        try {
            await main();
            await prisma.$disconnect();
        } catch (error) {
            console.error(error);
            await prisma.$disconnect();
            process.exit(1);
        }
})();

