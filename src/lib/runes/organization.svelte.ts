import { clerkContext } from '$lib/utils/context.js'
import type { OrganizationMembershipResource, OrganizationResource } from '@clerk/types'

type UseOrganizationReturn =
  | {
    isLoaded: false
    organization: undefined
    membership: undefined
  }
  | {
    isLoaded: true
    organization: OrganizationResource
    membership: undefined
  }
  | {
    isLoaded: boolean
    organization: OrganizationResource | null
    membership: OrganizationMembershipResource | null | undefined
  }

export const organization = $derived.by<UseOrganizationReturn>(() => {
  const { organization, session, isLoaded } = clerkContext.get()

  if (organization === undefined)
    return { isLoaded: false, organization: undefined, membership: undefined }

  if (organization === null)
    return { isLoaded: true, organization: null, membership: null }

  /** In SSR context we include only the organization object when loadOrg is set to true. */
  if (!isLoaded) {
    return {
      isLoaded: true,
      organization,
      membership: undefined,
    }
  }

  return {
    isLoaded,
    organization,
    membership: getCurrentOrganizationMembership(
      session!.user.organizationMemberships,
      organization.id,
    ),
  }
})

function getCurrentOrganizationMembership(
  organizationMemberships: OrganizationMembershipResource[],
  activeOrganizationId: string,
) {
  return organizationMemberships.find(
    organizationMembership => organizationMembership.organization.id === activeOrganizationId,
  )
}
