CREATE DATABASE wishjourney;

\c wishjourney

-- Create User Table
CREATE TABLE Users (
    userid SERIAL PRIMARY KEY,
	fullName VARCHAR(100),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_digest VARCHAR(255) NOT NULL,
    signupDate DATE DEFAULT CURRENT_DATE
);

-- Create Destinations
CREATE TABLE Destinations (
    id SERIAL PRIMARY KEY,
    userid INTEGER NOT NULL REFERENCES Users(userid) ON DELETE CASCADE,
    name VARCHAR(255),
    imageurl TEXT,
    targetVisitDate DATE,
    duration INTEGER, 
    travelPartners VARCHAR(255),
    budget INTEGER,
    note TEXT
);

-- Insert demo data into Destinations
INSERT INTO Destinations (userid, name, imageurl, targetVisitDate, duration, travelPartners, budget, note)
VALUES (1, 'Paris', 'https://www.thetrainline.com/cms/media/1360/france-eiffel-tower-paris.jpg?mode=crop&width=1080&height=1080&quality=70', '2023-12-15', 5, 'Family', 5000, 'Plan to visit Eiffel Tower and Louvre Museum.');

INSERT INTO Destinations (userid, name, imageurl, targetVisitDate, duration, travelPartners, budget, note)
VALUES (1, 'Tokyo', 'https://media.tacdn.com/media/attractions-splice-spp-674x446/09/9c/36/5d.jpg', '2024-04-10', 7, 'Solo', 4000, 'Wish to experience cherry blossom season.');

INSERT INTO Destinations (userid, name, imageurl, targetVisitDate, duration, travelPartners, budget, note)
VALUES (1, 'Rome', 'https://www.racv.com.au/content/dam/racv/images/content-hub/travel/location/international/italy/rome/900x600-GettyImages-1341704677.jpg', '2023-09-01', 6, 'Partner', 4000, 'Excited to explore the Colosseum and indulge in Italian cuisine.');

INSERT INTO Destinations (userid, name, imageurl, targetVisitDate, duration, travelPartners, budget, note)
VALUES (1, 'Santorini', 'https://www.msccruises.fi/-/media/global-contents/cruise-deals/santorini-summer-cruises.jpg?bc=transparent&as=1&dmc=0&iar=0&mh=600&mw=960&sc=0&thn=0&udi=0&hash=A91325E5A94450F99AB96F3E892FA288', '2023-07-15', 7, 'Partner', 4000, 'Looking forward to the breathtaking sunsets in Oia and exploring the beautiful beaches with unique colored sands. Would love to visit the ancient ruins and taste the local wines.');
