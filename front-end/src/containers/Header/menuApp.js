// role admin will have these menus
export const adminMenu = [
  // user system
  {
    // 1st menu
    name: 'menu.admin.manage-user',
    menus: [
      // one object is a submenu
      {
        name: 'menu.admin.crud',
        link: '/system/user-manage',
      },
      {
        name: 'menu.admin.crud-redux',
        link: '/system/user-redux',
      },
      // {
      //   name: 'menu.admin.manage-admin',
      //   link: '/system/admin-manage',
      // },
      {
        name: 'menu.admin.manage-doctor',
        link: '/system/doctor-manage',
      },
      {
        name: 'menu.doctor.manage-schedule',
        link: '/doctor/schedule-manage',
      },
    ],
  },

  // clinic menu
  {
    name: 'menu.admin.clinic-menu',
    menus: [
      {
        name: 'menu.admin.manage-clinic',
        link: '/system/clinic-manage',
      },
    ],
  },

  // specialist menu
  {
    name: 'menu.admin.specialist-menu',
    menus: [
      {
        name: 'menu.admin.manage-specialist',
        link: '/system/specialist-manage',
      },
    ],
  },
]

// role doctor will have these menus available
export const doctorMenu = [
  {
    // 1st menu
    name: 'menu.admin.manage-user',
    menus: [
      // one object is a submenu
      {
        name: 'menu.doctor.manage-schedule',
        link: '/doctor/schedule-manage',
      },
    ],
  },

  {
    // 1st menu
    name: 'menu.doctor.patient-menu',
    menus: [
      // one object is a submenu
      {
        name: 'menu.doctor.manage-patient',
        link: '/doctor/patient-manage',
      },
    ],
  },
]

// export const doctorMenu = [
//   {
//     name: 'menu.doctor.manage-schedule',
//     link: '/doctor/schedule-manage',
//   },
// ]
