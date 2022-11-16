import { useState, useEffect } from 'react';
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Title,
  Group,
  Menu,
  Button,
  UnstyledButton,
  Divider,
  Grid,
  Card,
  List,
  Box,
  ScrollArea,
  InputWrapper,
  Select,
} from '@mantine/core';
import { useColorScheme, useScrollLock, useViewportSize } from '@mantine/hooks';
import { SwitchToggle } from './ToggleTheme';
import ReactMapboxGl, {GeoJSONLayer} from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Search } from 'tabler-icons-react';
import Total from './TotaEnergy';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import L, { LatLngExpression } from "leaflet"
import Police from './PoliceStations';

const accessToken = 'pk.eyJ1IjoiZGF2aXNraXRhdmkiLCJhIjoiY2w0c2x2NjNwMGRvbDNrbGFqYW9na2NtaSJ9.q5rs7WMJE8oaBQdO4zEAcg';

export default function Dashboard() {
  const theme = useMantineTheme();
  const preferredColorscheme = useColorScheme();
  const [themescheme, setThemeScheme] = useState('dark');
  const [opened, setOpened] = useState(false);
  const { height, width } = useViewportSize();
  const [scrollLocked, setScrollLocked] = useScrollLock(true);
  const [county, setCounty] = useState('');
  const [mopened, setMOpened] = useState(false);
  const [unit, setUnit] = useState('');
  const [feature, setFeature] = useState<any>(null);
  const Map = ReactMapboxGl({
    accessToken: accessToken
  });

  useEffect(() => {
    setThemeScheme(preferredColorscheme);
  }, [preferredColorscheme]);

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      header={
        <Header height={70} p="md">
          <Group position='apart'>
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <Title order={3}>TotalEnergies </Title>
          </div>


        <MediaQuery smallerThan={'lg'} styles={{display: 'none'}}>
        <Group spacing='md' >
            <Menu opened={mopened} style={{marginRight: 30,}} control={<UnstyledButton onClick={() => {setMOpened(!mopened)}} >
              <div>
                <Text>filter by county</Text>
                <Text size='xs' color='dimmed'>{county === '' ? "No county selected" : `You are viewing:${county.toUpperCase()}`}</Text>
              </div>
            </UnstyledButton>} >
              <Select value={county} onChange={(val: any) => {
                setMOpened(false)
                setCounty(val)
              }}  placeholder="Filter by county" data={[
            {value: '', label: 'All'},
            {value: 'Baringo', label: 'Baringo'},
            {value: 'Kericho', label: 'Kericho'},
            {value: 'Nairobi', label: 'Nairobi'},
            {value: 'Mombasa', label: 'Mombasa'},
            {value: 'Nakuru', label: 'Nakuru'},
            {value: 'Elgeyo_Marakwet', label: 'Elgeyo Marakwet'},
            {value: 'West Pokot', label: 'West Pokot'},
            {value: 'Narok', label: 'Narok'},
            {value: 'Kajiado', label: 'Kajiado'},
            {value: 'Machakos', label: 'Machakos'},
            {value: 'Embu', label: 'Embu'},
            {value: 'Tharaka', label: 'Tharaka Nithi'},
            {value: 'Laikipia', label: 'Laikipia'},
            {value: 'Nyandarua', label: 'Nyandarua'},
            {value: 'Kitui', label: 'Kitui'},
            {value: 'Makueni', label: 'Makueni'},
            {value: 'Tana River', label: 'Tana River'},
            {value: 'Garissa', label: 'Garissa'},
            {value: 'Bomet', label: 'Bomet'},
            {value: 'Bungoma', label: 'Bungoma'},
            {value: 'Busia', label: 'Busia'},
            {value: 'Homa Bay', label: 'Homa Bay'},
            {value: 'Isiolo', label: 'Isiolo'},
            {value: 'Kakamega', label: 'Kakamega'},
            {value: 'Kiambu', label: 'Kiambu'},
            {value: 'Kilifi', label: 'Kilifi'},
            {value: 'Kirinyaga', label: 'Kirinyaga'},
            {value: 'Kisii', label: 'Kisii'},
            {value: 'Kisumu', label: 'Kisumu'},
            {value: 'Kwale', label: 'Kwale'},
            {value: 'Lamu', label: 'Lamu'},
            {value: 'Mandera', label: 'Mandera'},
            {value: 'Marsabit', label: 'Marsabit'},
            {value: 'Meru', label: 'Meru'},
            {value: 'Migori', label: 'Migori'},
            {value: "Murang'a", label: "Murang'a"},
            {value: 'Nandi', label: 'Nandi'},
            {value: 'Nyamira', label: 'Nyamira'},
            {value: 'Nyeri', label: 'Nyamira'},
            {value: 'Samburu', label: 'Samburu'},
            {value: 'Siaya', label: 'Siaya'},
            {value: 'Taita_Taveta', label: 'Taita-Taveta'},
            {value: 'Trans Nzoia', label: 'Trans Nzoia'},
            {value: 'Turkana', label: 'Turkana'},
            {value: 'Uasin Gishu', label: 'Uasin Gishu'},
            {value: 'Vihiga', label: 'Vihiga'},
            {value: 'Wajir', label: 'Wajir'},
          ]} searchable icon={<Search size={15} />} />
            </Menu>

            <Menu style={{marginRight: 30,}} control={<UnstyledButton>
              <div>
                <Text>filter by administrative units</Text>
                <Text size='xs' color='dimmed'>{unit === '' ? "No administrative unit selected" : `Selected category: ${unit.toUpperCase()}`}</Text>
              </div>
            </UnstyledButton>} >
              <Menu.Item onClick={() => {setUnit('Police')}}>Police Stations</Menu.Item>
              <Menu.Item onClick={() => {setUnit('Public Offices')}}>Public Administration Offices</Menu.Item>
              <Menu.Item onClick={() => {setUnit('')}} >All Categories</Menu.Item>
            </Menu>


        </Group>
        </MediaQuery>

        <SwitchToggle />
        
          </Group>
        </Header>
      }
    >

      <>
      <MediaQuery smallerThan={'lg'} styles={{display: 'none'}}>
      <Grid gutter='xs' columns={24}>
        <Grid.Col span={6}>
          <Card style={{height: height - 100}} shadow='sm' p={'md'}>
            <Group direction='column'>
              <div>
                <Title style={{color: '#94D82D'}} order={5}>Introduction</Title>
                <Text size='sm'>This dashboard provides a summary of the locations of <i>TotalEnergies</i> service stations 
                and their proximity to police stations and public administration offices in Kenya.<br />
                Central to the system are the actual locations of the service stations, actual locations of the administrative
                units and a routing mechanism between various location end points.
                </Text>
              </div>

              <div>
              <Title style={{color: '#94D82D'}} order={5}>Using this dashboard</Title>
              <Text size='sm'><i>TotalEnergies</i> service stations are denoted with <span style={{color: '#FAB005'}} >yellow</span> markers. Police units
              are denoted with <span style={{color: 'blue'}}>blue</span> markers. To view information about a particular station, click on the marker. To establish a route between two points, click the two points.
              <br /> By using the filters on the header, the summary information can further be filtered by:<List style={{marginLeft: 'auto', marginRight: 'auto'}}><List.Item>County</List.Item> <List.Item>Administrative unit</List.Item></List></Text>
              </div>
            </Group>
          </Card>
        </Grid.Col>
        <Grid.Col span={12}>
        <Card style={{height: height - 100}} shadow='sm'>
        <MapContainer center={[-1.234,36.754]} style={{height: '100%', width: '100%'}} zoom={6}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url={ theme.colorScheme === "dark" ? "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png" : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
  />
  <GeoJSON data={Police} pointToLayer={(f, latlng) => {
    return new L.CircleMarker(latlng, {
      opacity: 1,
      fillOpacity: 1,
      weight: 2,
      color: "blue",
      fillColor: "blue",
      radius: 7
    })
  }} onEachFeature={(f, l) => {
      l.bindPopup("<table><tr><td>Name</td><td>"+f.properties.name+"</td></tr></table>")
  }} />
  <GeoJSON data={Total} pointToLayer={(f, latLng) => {
          return new L.CircleMarker(latLng, {
            opacity: 1,
            fillOpacity: 1,
            weight: 2,
            color: 'orange',
            fillColor: 'orange',
            radius: 7
          })
        }} onEachFeature={(f, l) => {
          l.on("mouseover", function(e){
            e.target.setStyle({
              color: "red",
              fillColor: 'red'
            });

            setFeature(f);
          });

          l.on("mouseout", function(e){
            e.target.setStyle({
              color: "orange",
              fillColor: 'orange'
            })

            setFeature(null);
          });

        }} />
</MapContainer>
            </Card>
        </Grid.Col>
        <Grid.Col span={6}>
        <Card style={{height: height - 100}} shadow='sm' p={'md'}>
    <Box
      sx={(theme) => ({
        height: '100%',
        marginBottom: 10,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
        padding: theme.spacing.xl,
        borderRadius: theme.radius.md,

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[1],
        },
      })}
    >
      <Title style={{color: '#94D82D'}} order={5}> Summary Info</Title>
      {feature !== null ? (
        <>
        <Text size='sm'>Name:<i>{feature.properties.name}</i></Text>
        <Text size='sm'>Brand:<i>{feature.properties.brand}</i></Text>
        <Text size='sm'>Amenity:<i>{feature.properties.amenity}</i></Text>
        </>
      ) : (
        <Text size='sm'><i>Hover over a point to see its properties.</i></Text>
      )}
    </Box>
        </Card>
        </Grid.Col>
      </Grid>
      </MediaQuery>
      </>
      
    </AppShell>
  );
}