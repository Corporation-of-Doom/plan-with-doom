const Seminar = `
type Seminar {
    id: Int!
    event: Event!
    name: String!
    startDatetime: String!
    endDatetime: String!
    description: String!
    capacityType: Capacity!
    location: String!

    """ If the capacityType is FCFS_P or  FCFS_P """
    capacity: Int

    # still need to add photo
    # Will deal with that when we have DB set up
  }
`;

module.exports = { Seminar };
