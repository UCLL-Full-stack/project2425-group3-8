import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { set } from 'date-fns';

const prisma = new PrismaClient();

const main = async () => {

        await prisma.matches.deleteMany();
        await prisma.event.deleteMany();
        await prisma.admin.deleteMany();
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
            name: 'Bal Bal Rollende Bal',
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
            name: 'Boem Boem Doet De Bal',
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
            name: 'Boing Boing de Bal',
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
            name: 'Tik Tak de Bal',
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
            name: 'Ping pong de Bal',
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
            winner: 'Team A',
            result: '3-2',
            date: new Date(),
            hour: '12:00',
            event: {
                connect: {
                    id: event1.id
                }
            }
        }
    });

    const matches2 = await prisma.matches.create({
        data: {
            winner: 'Team B',
            result: '2-1',
            date: new Date(),
            hour: '14:00',
            event: {
                connect: {
                    id: event2.id
                }
            }
        }
    });
    const user = await prisma.user.create({
        data: {
            fullName: 'John Doe',
            phoneNumber: '0487654321',
            email: 'johndoe@gmail.com',
            password: await bcrypt.hash('john', 10),
        }
    });


    const admin = await prisma.admin.create({
        data: {
            user: { connect: { id: user.id } },
            address: { connect: { id: location1.id } },
        },
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

