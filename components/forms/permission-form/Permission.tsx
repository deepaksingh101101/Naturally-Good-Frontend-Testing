'use client';

import { useForm, Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';

type Role = 'manager' | 'executive' | 'external' | 'admin';

type ActionPermissions = {
  [K in Role]: boolean;
};

type ProductManagementPermissions = {
  createProduct: ActionPermissions;
  productAvailability: ActionPermissions;
  viewProduct: ActionPermissions;
  editProduct: ActionPermissions;
};
type BagManagementPermissions = {
  createBag: ActionPermissions;
  bagAvailability: ActionPermissions;
  viewBag: ActionPermissions;
  editBag: ActionPermissions;
};
type SubscriptionManagementPermissions = {
  createSubscription: ActionPermissions;
  subscriptionAvailability: ActionPermissions;
  viewSubscription: ActionPermissions;
  editSubscription: ActionPermissions;
};
type EmployeeManagementPermissions = {
  createEmployee: ActionPermissions;
  deleteEmployee: ActionPermissions;
  viewEmployee: ActionPermissions;
  editEmployee: ActionPermissions;
  createNewRole: ActionPermissions;
};

type CustomerManagementPermissions = {
  createCustomer: ActionPermissions;
  customerStatus: ActionPermissions;
  viewCustomer: ActionPermissions;
  editCustomer: ActionPermissions;
};
type OrderManagementPermissions = {
  createOrder: ActionPermissions;
  orderStatus: ActionPermissions;
  viewOrder: ActionPermissions;
  editOrder: ActionPermissions;
  upgradeOrder: ActionPermissions;
  netPriceEditable: ActionPermissions;
  editDelivery: ActionPermissions;
};
type DeliveryManagementPermissions = {
  deliveryStatus: ActionPermissions;
  skipDelivery: ActionPermissions;
  modifyDeliveryBag: ActionPermissions;
  editDeliveryDetails: ActionPermissions;
};
type ComplainManagementPermissions = {
  complainTypeStatus: ActionPermissions;
  createComplainType: ActionPermissions;
  editComplainType: ActionPermissions;
  resolveComplain: ActionPermissions;
};

interface PermissionFormValues {
  permissions: {
    productManagement: ProductManagementPermissions;
    bagManagement: BagManagementPermissions;
    subscriptionManagement: SubscriptionManagementPermissions;
    employeeManagement: EmployeeManagementPermissions;
    customerManagement: CustomerManagementPermissions;
    orderManagement: OrderManagementPermissions;
    deliveryManagement: DeliveryManagementPermissions;
    complainManagement: ComplainManagementPermissions;
  };
}

export const PermissionForm: React.FC = () => {
  const { control, handleSubmit } = useForm<PermissionFormValues>({
    defaultValues: {
      permissions: {
        productManagement: {
          createProduct: { manager: false, executive: true, external: true, admin: true },
          viewProduct: { manager: false, executive: true, external: true, admin: true },
          editProduct: { manager: false, executive: true, external: true, admin: true },
          productAvailability: { manager: false, executive: true, external: true, admin: true },
        },
        bagManagement: {
          createBag: { manager: false, executive: true, external: true, admin: true },
          viewBag: { manager: false, executive: true, external: true, admin: true },
          editBag: { manager: false, executive: true, external: true, admin: true },
          bagAvailability: { manager: false, executive: true, external: true, admin: true },
        },
        subscriptionManagement: {
          createSubscription: { manager: false, executive: true, external: true, admin: true },
          viewSubscription: { manager: false, executive: true, external: true, admin: true },
          editSubscription: { manager: false, executive: true, external: true, admin: true },
          subscriptionAvailability: { manager: false, executive: true, external: true, admin: true },
        },
        employeeManagement: {
          createEmployee: { manager: false, executive: true, external: true, admin: true },
          deleteEmployee: { manager: false, executive: true, external: true, admin: true },
          viewEmployee: { manager: false, executive: true, external: true, admin: true },
          editEmployee: { manager: false, executive: true, external: true, admin: true },
          createNewRole: { manager: false, executive: true, external: true, admin: true },
        },
        customerManagement: {
          createCustomer: { manager: false, executive: true, external: true, admin: true },
          viewCustomer: { manager: false, executive: true, external: true, admin: true },
          editCustomer: { manager: false, executive: true, external: true, admin: true },
          customerStatus: { manager: false, executive: true, external: true, admin: true },
        },
        orderManagement: {
          createOrder: { manager: false, executive: true, external: true, admin: true },
          viewOrder: { manager: false, executive: true, external: true, admin: true },
          editOrder: { manager: false, executive: true, external: true, admin: true },
          upgradeOrder: { manager: false, executive: true, external: true, admin: true },
          netPriceEditable: { manager: false, executive: true, external: true, admin: true },
          editDelivery: { manager: false, executive: true, external: true, admin: true },
          orderStatus: { manager: false, executive: true, external: true, admin: true },
        },
        deliveryManagement: {
          modifyDeliveryBag: { manager: false, executive: true, external: true, admin: true },
          editDeliveryDetails: { manager: false, executive: true, external: true, admin: true },
          skipDelivery: { manager: false, executive: true, external: true, admin: true },
          deliveryStatus: { manager: false, executive: true, external: true, admin: true },
        },
        complainManagement: {
          complainTypeStatus: { manager: false, executive: true, external: true, admin: true },
          createComplainType: { manager: false, executive: true, external: true, admin: true },
          editComplainType: { manager: false, executive: true, external: true, admin: true },
          resolveComplain: { manager: false, executive: true, external: true, admin: true },
        },
      },
    },
  });

  const onSubmit = (data: PermissionFormValues) => {
    console.log(data);
    // Handle form submission, like making an API call to save the data
  };

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading title="Permissions Settings" description="Manage Permissions Settings" />
      </div>
      <Separator />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">

        <div style={{ border: "1px solid green" }} className="p-2 space-y-4">
          <div className="font-bold text-2xl text-green-500 mt-2">Product Management</div>
          <div className="flex items-center">
            <div className="w-1/5 text-center"></div>
            <div className="w-1/5 text-center font-semibold">Executive</div>
            <div className="w-1/5 text-center font-semibold">Manager</div>
            <div className="w-1/5 text-center font-semibold">Admin</div>
            <div className="w-1/5 text-center font-semibold">External</div>
          </div>
          {(['createProduct', 'viewProduct', 'editProduct', 'productAvailability'] as const).map((action) => (
            <div key={action} className="flex items-center">
              <div className="w-1/5 font-semibold">{action.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</div>
              {(['executive', 'manager', 'admin', 'external'] as Role[]).map((role) => (
                <div key={role} className="w-1/5 text-center">
                  <Controller
                    control={control}
                    name={`permissions.productManagement.${action}.${role}`}
                    render={({ field }) => (
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(value) => field.onChange(value)}
                        aria-label={`${action} ${role}`}
                      />
                    )}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Repeat similar blocks for other management types */}
        <div style={{ border: "1px solid green" }} className="p-2 space-y-4">
          <div className="font-bold text-2xl text-green-500 mt-2">Bag Management</div>
          <div className="flex items-center">
            <div className="w-1/5 text-center"></div>
            <div className="w-1/5 text-center font-semibold">Executive</div>
            <div className="w-1/5 text-center font-semibold">Manager</div>
            <div className="w-1/5 text-center font-semibold">Admin</div>
            <div className="w-1/5 text-center font-semibold">External</div>
          </div>
          {(['createBag', 'viewBag', 'editBag', 'bagAvailability'] as const).map((action) => (
            <div key={action} className="flex items-center">
              <div className="w-1/5 font-semibold">{action.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</div>
              {(['executive', 'manager', 'admin', 'external'] as Role[]).map((role) => (
                <div key={role} className="w-1/5 text-center">
                  <Controller
                    control={control}
                    name={`permissions.bagManagement.${action}.${role}`}
                    render={({ field }) => (
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(value) => field.onChange(value)}
                        aria-label={`${action} ${role}`}
                      />
                    )}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>    
        
        <div style={{ border: "1px solid green" }} className="p-2 space-y-4">
          <div className="font-bold text-2xl text-green-500 mt-2">Subscription Management</div>
          <div className="flex items-center">
            <div className="w-1/5 text-center"></div>
            <div className="w-1/5 text-center font-semibold">Executive</div>
            <div className="w-1/5 text-center font-semibold">Manager</div>
            <div className="w-1/5 text-center font-semibold">Admin</div>
            <div className="w-1/5 text-center font-semibold">External</div>
          </div>
          {(['createSubscription', 'viewSubscription', 'editSubscription', 'subscriptionAvailability'] as const).map((action) => (
            <div key={action} className="flex items-center">
              <div className="w-1/5 font-semibold">{action.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</div>
              {(['executive', 'manager', 'admin', 'external'] as Role[]).map((role) => (
                <div key={role} className="w-1/5 text-center">
                  <Controller
                    control={control}
                    name={`permissions.subscriptionManagement.${action}.${role}`}
                    render={({ field }) => (
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(value) => field.onChange(value)}
                        aria-label={`${action} ${role}`}
                      />
                    )}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>    
        <div style={{ border: "1px solid green" }} className="p-2 space-y-4">
          <div className="font-bold text-2xl text-green-500 mt-2">Employee Management</div>
          <div className="flex items-center">
            <div className="w-1/5 text-center"></div>
            <div className="w-1/5 text-center font-semibold">Executive</div>
            <div className="w-1/5 text-center font-semibold">Manager</div>
            <div className="w-1/5 text-center font-semibold">Admin</div>
            <div className="w-1/5 text-center font-semibold">External</div>
          </div>
          {(['createEmployee', 'deleteEmployee', 'viewEmployee', 'editEmployee','createNewRole'] as const).map((action) => (
            <div key={action} className="flex items-center">
              <div className="w-1/5 font-semibold">{action.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</div>
              {(['executive', 'manager', 'admin', 'external'] as Role[]).map((role) => (
                <div key={role} className="w-1/5 text-center">
                  <Controller
                    control={control}
                    name={`permissions.employeeManagement.${action}.${role}`}
                    render={({ field }) => (
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(value) => field.onChange(value)}
                        aria-label={`${action} ${role}`}
                      />
                    )}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>    
        <div style={{ border: "1px solid green" }} className="p-2 space-y-4">
          <div className="font-bold text-2xl text-green-500 mt-2">Customer Management</div>
          <div className="flex items-center">
            <div className="w-1/5 text-center"></div>
            <div className="w-1/5 text-center font-semibold">Executive</div>
            <div className="w-1/5 text-center font-semibold">Manager</div>
            <div className="w-1/5 text-center font-semibold">Admin</div>
            <div className="w-1/5 text-center font-semibold">External</div>
          </div>
          {(['createCustomer', 'viewCustomer', 'editCustomer', 'customerStatus'] as const).map((action) => (
            <div key={action} className="flex items-center">
              <div className="w-1/5 font-semibold">{action.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</div>
              {(['executive', 'manager', 'admin', 'external'] as Role[]).map((role) => (
                <div key={role} className="w-1/5 text-center">
                  <Controller
                    control={control}
                    name={`permissions.customerManagement.${action}.${role}`}
                    render={({ field }) => (
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(value) => field.onChange(value)}
                        aria-label={`${action} ${role}`}
                      />
                    )}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>    
        <div style={{ border: "1px solid green" }} className="p-2 space-y-4">
          <div className="font-bold text-2xl text-green-500 mt-2">Order Management</div>
          <div className="flex items-center">
            <div className="w-1/5 text-center"></div>
            <div className="w-1/5 text-center font-semibold">Executive</div>
            <div className="w-1/5 text-center font-semibold">Manager</div>
            <div className="w-1/5 text-center font-semibold">Admin</div>
            <div className="w-1/5 text-center font-semibold">External</div>
          </div>
          {(['createOrder', 'viewOrder', 'editOrder', 'upgradeOrder','netPriceEditable','editDelivery','orderStatus'] as const).map((action) => (
            <div key={action} className="flex items-center">
              <div className="w-1/5 font-semibold">{action.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</div>
              {(['executive', 'manager', 'admin', 'external'] as Role[]).map((role) => (
                <div key={role} className="w-1/5 text-center">
                  <Controller
                    control={control}
                    name={`permissions.orderManagement.${action}.${role}`}
                    render={({ field }) => (
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(value) => field.onChange(value)}
                        aria-label={`${action} ${role}`}
                      />
                    )}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>    
        <div style={{ border: "1px solid green" }} className="p-2 space-y-4">
          <div className="font-bold text-2xl text-green-500 mt-2">Delivery Management</div>
          <div className="flex items-center">
            <div className="w-1/5 text-center"></div>
            <div className="w-1/5 text-center font-semibold">Executive</div>
            <div className="w-1/5 text-center font-semibold">Manager</div>
            <div className="w-1/5 text-center font-semibold">Admin</div>
            <div className="w-1/5 text-center font-semibold">External</div>
          </div>
          {(['modifyDeliveryBag', 'editDeliveryDetails', 'skipDelivery', 'deliveryStatus'] as const).map((action) => (
            <div key={action} className="flex items-center">
              <div className="w-1/5 font-semibold">{action.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</div>
              {(['executive', 'manager', 'admin', 'external'] as Role[]).map((role) => (
                <div key={role} className="w-1/5 text-center">
                  <Controller
                    control={control}
                    name={`permissions.deliveryManagement.${action}.${role}`}
                    render={({ field }) => (
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(value) => field.onChange(value)}
                        aria-label={`${action} ${role}`}
                      />
                    )}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>    
        

        <div style={{ border: "1px solid green" }} className="p-2 space-y-4">
          <div className="font-bold text-2xl text-green-500 mt-2">Complain Management</div>
          <div className="flex items-center">
            <div className="w-1/5 text-center"></div>
            <div className="w-1/5 text-center font-semibold">Executive</div>
            <div className="w-1/5 text-center font-semibold">Manager</div>
            <div className="w-1/5 text-center font-semibold">Admin</div>
            <div className="w-1/5 text-center font-semibold">External</div>
          </div>
          {(['createComplainType', 'editComplainType', 'resolveComplain', 'complainTypeStatus'] as const).map((action) => (
            <div key={action} className="flex items-center">
              <div className="w-1/5 font-semibold">{action.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</div>
              {(['executive', 'manager', 'admin', 'external'] as Role[]).map((role) => (
                <div key={role} className="w-1/5 text-center">
                  <Controller
                    control={control}
                    name={`permissions.complainManagement.${action}.${role}`}
                    render={({ field }) => (
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(value) => field.onChange(value)}
                        aria-label={`${action} ${role}`}
                      />
                    )}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>  
            <Button type="submit">Save Permissions</Button>
      </form>
    </>
  );
};

export default PermissionForm;
